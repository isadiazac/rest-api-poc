// src/middleware/auth.js
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "changeme";

function authMiddleware(req, res, next) {
  const auth = req.headers["authorization"];
  if (!auth)
    return res.status(401).json({ error: "Authorization header missing" });

  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Invalid Authorization format" });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default authMiddleware;
