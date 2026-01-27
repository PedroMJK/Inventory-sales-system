import express from "express";
import { salesSumary } from "../controllers/reportController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/summary", salesSumary);

export default router;