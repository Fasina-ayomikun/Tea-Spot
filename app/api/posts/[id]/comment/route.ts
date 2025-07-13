import { dbConnect } from "@/lib/dbConnect";
import { Comment } from "@/models/Comment";
import { getUserId } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: Promise<string>;
  };
};

export async function POST(req: Request, { params }: Params) {
  try {
    await dbConnect();

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
        { success: false, message: "Text is required" },
        { status: 400 }
      );
    }

    const comment = await Comment.create({
      postId: await params.id,
      text,
      author: userId,
    });

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
