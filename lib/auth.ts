import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function getUserId(req: Request): string | null {
  console.log("okkkk");

  const authHeader = req.headers.get("authorization");
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    return decoded.userId;
  } catch (err) {
    return null;
  }
}
