import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/models/Post";
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

    const post = await Post.findById(await params.id);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id: string) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return NextResponse.json(
      {
        success: true,
        liked: !alreadyLiked,
        message: alreadyLiked ? "Unliked post" : "Liked post",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
