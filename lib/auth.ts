import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function getUserId(req: Request): {
  userId: string | null;
  error?: string;
} {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      userId: null,
      error: "No tea, no shade — but you're not even logged in 🫣",
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    return { userId: decoded.userId };
  } catch {
    return {
      userId: null,
      error:
        "That token's giving expired energy 😵‍💫 Try logging in again, bestie.",
    };
  }
}
