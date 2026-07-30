import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import transactionRoutes from "./routes/transactions.route.js";
import dashboardRoutes from "./routes/dashboard.route.js"
import authMiddleware from "./middlewares/auth.middleware.js";
import { queryParser } from "express-query-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true, // "true" otomatis jadi true
        parseNumber: true, // "123" otomatis jadi 123
    }),
);

app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/transactions",authMiddleware,transactionRoutes)
app.use("/category",authMiddleware,categoryRoutes);
app.use("/user",authMiddleware,userRoutes);
app.use("/dashboard",authMiddleware,dashboardRoutes);


export default app;
