// src/index.js
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import tasksRouter from "./routes/tasks.js";
import authRouter from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import { migrate } from "./db/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Migrar DB si se pasa el argumento
if (process.argv.includes("migrate")) {
  migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}

// Auth endpoints
app.use("/api/v1/auth", authRouter);

// Protected tasks endpoints
app.use("/api/v1/tasks", authMiddleware, tasksRouter);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
