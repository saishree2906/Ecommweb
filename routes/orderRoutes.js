import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getOrders);
router.post("/", protect, createOrder);
router.put("/status/:id", protect, isAdmin, updateOrderStatus);

export default router;
