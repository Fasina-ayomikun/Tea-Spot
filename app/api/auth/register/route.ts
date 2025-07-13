import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: Request) => {
  const { username, password } = await req.json();
  console.log(username, password);

  try {
    await dbConnect();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Hold up 🤚🏽 All fields are required!" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return NextResponse.json(
        {
          message: "This one’s already taken, bestie 💅 Try a fresh username.",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ username, userId: user._id }, SECRET, {
      expiresIn: "30d",
    });

    return NextResponse.json(
      {
        message: "Tea served ☕ Welcome to the hot gist zone!",
        token,
        user: {
          _id: user._id,
          username: user.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Oops! Something went wrong on our end. Try again in a bit 😓",
      },
      { status: 500 }
    );
  }
};
