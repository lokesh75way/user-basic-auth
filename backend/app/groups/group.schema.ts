import { type IGroup } from './group.dto';
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const groupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    privacy: { type: String, required: true, enum: ["PUBLIC", "PRIVATE"], default: "PUBLIC" },
    admins : { type: [String], required: true },
    active: { type: Boolean, required: false, default: true },
    members : { type: [String], required: true },
}, {timestamps: true});

export default mongoose.model<IGroup>("group", groupSchema);
