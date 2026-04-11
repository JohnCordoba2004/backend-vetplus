import { Document, Schema, model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

const userSchema = new Schema<IPlan>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default model<IPlan>("User", userSchema);
