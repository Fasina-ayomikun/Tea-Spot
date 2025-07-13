import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: Request, res: Response) => {
  const { username, password } = await req.json();
  console.log(username, password);

  try {
    await dbConnect();
    if (!username || !password) {
      return NextResponse.json("Please provide all credentials", {
        status: 400,
      });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return NextResponse.json("Username already in use", { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = jwt.sign({ username }, "JWT_SECRET", {
      expiresIn: "30d",
    });
    await User.create({
      username,
      password: hashedPassword,
    });
    return NextResponse.json("Welcome to the Tea Spot", {
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
};
