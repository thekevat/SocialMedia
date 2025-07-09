import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace with your secret
    req.user = decoded; // You can now access user info in routes (e.g., req.user.id)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
