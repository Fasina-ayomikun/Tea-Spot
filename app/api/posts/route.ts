import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/models/Post";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { success: false, message: "Post content is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const post = await Post.create({ text, author: userId });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find()
      .populate({
        path: "username",
        model: "User",
      })
      // .populate({ path: "likes", select: "username" })
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
