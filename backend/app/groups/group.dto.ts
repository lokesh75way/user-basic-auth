import { Document } from 'mongoose';

export interface IGroup extends Document {
    name: string;
    admins : string[];
    active: boolean;
    privacy: "PUBLIC" | "PRIVATE";
    members : string[];
}