import { dbConnect } from "@/lib/dbConnect";
import { Post } from "@/models/Post";
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
        {
          success: false,
          message: "Oops! You need to be logged in to like posts 😬",
        },
        { status: 401 }
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found. It may have spilled already ☕",
        },
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
        message: alreadyLiked
          ? "You unliked the tea 👀"
          : "You liked the tea 🔥",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Yikes 😵 Something went wrong. Try again later.",
      },
      { status: 500 }
    );
  }
}
