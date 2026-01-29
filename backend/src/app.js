import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import clientRoutes from "./routes/clientRoutes.js"
import saleRoutes from "./routes/saleRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

import connectDB from "./config/db.js"

dotenv.config()

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes); 
app.use("/api/sales", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);
    
export default app;