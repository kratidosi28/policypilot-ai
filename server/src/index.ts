import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { database } from "./config/db";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
const PORT = env.port;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/api/auth", authRouter);

app.get("/health", async (_req, res) => {
  try {
    const result = await database.query("SELECT NOW()");

    res.status(200).json({
      success: true,
      message: "PolicyPilot AI server and database are running",
      databaseTime: result.rows[0].now,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server is running, but database connection failed",
    });
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
