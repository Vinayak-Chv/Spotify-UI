import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const port = process.env.PORT;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

app.use("/api/user", userRoutes);
app.use("/api/youtube", songRoutes);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}).catch(err => console.error("MongoDB connection failed", err));