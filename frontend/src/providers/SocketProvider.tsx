import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { useMeQuery } from "../services/api";
import { useAppSelector } from "../store/store";

const Context = createContext<{ socket?: Socket; connected: boolean }>({
  connected: false,
});

export default function SocketProvider(props: PropsWithChildren) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data } = useMeQuery(undefined, { skip: !isAuthenticated });
  const userId = data?.data._id;

  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket>();

  const baseUrl = new URL(import.meta.env.VITE_API_URL).origin;

  const initSocket = () => {
    if (!userId || socketRef.current) return;

    const transports = ["websocket", "polling"];
    const socket: Socket = io(baseUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      transports,
      query: { userId },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      console.log("✅ Socket connected");
    });

    socket.on("disconnect", (reason) => {
      setConnected(false);
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      setConnected(false);
      console.error("❌ Connection error:", err);
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log(`🔄 Reconnect attempt #${attempt}`);
    });

    socket.io.on("reconnect", (attempt) => {
      console.log(`✅ Successfully reconnected on attempt #${attempt}`);
      setConnected(true);
    });
  };

  useEffect(() => {
    if (userId && !socketRef.current) {
      initSocket();
    }

    return () => {
      // Cleanup on unmount or user change
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = undefined;
      }
    };
  }, [userId]);

  return (
    <Context.Provider value={{ socket: socketRef.current, connected }}>
      {props.children}
    </Context.Provider>
  );
}

export const useSocket = <T extends any[] = any[]>(
  events?: string | string[]
) => {
  const { socket, connected } = useContext(Context);
  const [data, setData] = useState<T>(() => [] as unknown as T);

  useEffect(() => {
    if (socket && events) {
      const items = Array.isArray(events) ? events : [events];
      items.forEach((event, index) => {
        socket.on(event, (_data) => {
          const dataV2 = items.map((item, _index) => {
            if (index == _index) {
              return _data;
            }
            return data[index];
          }) as T;

          setData(dataV2);
        });
      });
      return () => {
        items.forEach((event) => {
          socket.removeListener(event, (_data) => {});
        });
      };
    }
  }, [socket]);
  return { socket, connected, data };
};
