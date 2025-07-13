import mongoose, { Schema, models } from "mongoose";
import { User } from "./User";

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: User, required: true },
    text: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: User }],
  },
  { timestamps: true }
);

export const Post = models.Post || mongoose.model("Post", PostSchema);
