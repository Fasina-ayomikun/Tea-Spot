import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET as string;

export const POST = async (req: Request, res: Response) => {
  const { username, password } = await req.json();

  try {
    await dbConnect();

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json("Invalid credentials", { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "7d" });

    return NextResponse.json(
      { token, message: "New Day New Tea" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
