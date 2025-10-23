import express from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, isAdmin, createCategory);



export default router;
