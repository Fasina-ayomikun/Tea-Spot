import { dbConnect } from "@/lib/dbConnect";
import { Comment } from "@/models/Comment";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: Request, { params }: Params) {
  try {
    await dbConnect();

    const { id: postId } = await params;
    const { userId } = getUserId(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Login first to spill your thoughts ✍️" },
        { status: 401 }
      );
    }

    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { success: false, message: "Your comment can’t be empty, bestie 💬" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      postId,
      text,
      author: userId,
    });

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Tea couldn't be served right now. Try again ☕",
      },
      { status: 500 }
    );
  }
}

export async function GET(_req: Request, { params }: Params) {
  try {
    await dbConnect();
    const { id: postId } = await params;

    const comments = await Comment.find({ postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Couldn’t fetch the gist right now 😔",
      },
      { status: 500 }
    );
  }
}
