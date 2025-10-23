import express from "express";
import passport from "passport";
import { register, login, getMe, oauthSuccess } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
const router = express.Router();

// Local Auth
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  oauthSuccess
);

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  oauthSuccess
);

export default router;