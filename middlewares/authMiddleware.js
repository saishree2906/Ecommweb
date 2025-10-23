import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token && req.cookies?.token) token = req.cookies.token;
  if (!token && req.query?.token) token = req.query.token;
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub || decoded.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    console.log("user role:", user.role);
    req.isAdmin = user.role === "admin"; // ✅ fix here

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ msg: "Token invalid", error: err.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};
