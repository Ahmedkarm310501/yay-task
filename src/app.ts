import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import { AppError } from "./utils/error";

const app = express();

app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);

// Not found handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Not found" });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

export default app;
