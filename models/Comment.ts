import mongoose, { Schema, models } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment =
  models.Comment || mongoose.model("Comment", CommentSchema);
