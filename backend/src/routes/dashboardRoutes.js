import express from "express";
import { getDashboardStats, getRevenueByMonth } from "../controllers/dashboardController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboardStats);
router.get("/revenue-by-month", authMiddleware, getRevenueByMonth)

export default router;