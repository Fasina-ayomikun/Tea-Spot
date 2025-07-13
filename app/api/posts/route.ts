import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/models/Post";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = getUserId(req);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Hold up ✋ You need to be logged in to spill some tea.",
        },
        { status: 401 }
      );
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "Don't leave us hanging 😭 What's the gist?",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const post = await Post.create({ text, author: userId });

    return NextResponse.json(
      {
        success: true,
        data: post,
        message: "Tea served 🍵 Your gist is live.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Eek! Something’s off on our end 😵 Try again in a bit.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const posts = await Post.find()
      .populate({
        path: "author",
        model: "User",
        select: "_id username",
      })
      .populate({ path: "likes", select: "username" })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: posts, message: "Here’s the latest tea 🔥" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Tea's stuck in the kettle 🫖 Couldn’t fetch posts.",
      },
      { status: 500 }
    );
  }
}
