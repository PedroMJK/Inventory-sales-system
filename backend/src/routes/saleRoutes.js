import express from "express";
import { createSale, getSales } from "../controllers/saleController.js";
import  authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSale);
router.get("/", getSales);

export default router;