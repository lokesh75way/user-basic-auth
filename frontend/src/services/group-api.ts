import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const baseUrl = import.meta.env.VITE_API_URL

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => `/groups`,
    }),
    getGroup: builder.query<ApiResponse<Group>, string>({
      query: (id) => `/groups/${id}`,
    }),
    createGroup: builder.mutation<ApiResponse<Group>, Omit<Group, '_id'| 'active' | 'admins' | 'members' >>({
      query: (body) => {
        return { url: `/groups`, method: 'POST', body }
      },
    }),
  }),
})

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
} = groupApi
