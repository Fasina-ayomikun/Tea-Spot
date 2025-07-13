import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: Request) => {
  const { username, password } = await req.json();

  try {
    await dbConnect();

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        {
          message:
            "Uh-oh 😬 That username or password didn’t spill the right tea. Try again.",
        },
        { status: 400 }
      );
    }

    const token = jwt.sign({ username, userId: user._id }, SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json(
      {
        token,
        user: {
          _id: user._id,
          username: user.username,
        },
        message: "New day, new gist 🌞 Welcome back!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Our vibes are off right now 😵 Hang tight and try again soon.",
      },
      { status: 500 }
    );
  }
};
