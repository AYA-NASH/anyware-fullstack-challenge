import { Request, Response, NextFunction } from "express";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import announcementRoutes from "./routes/announcements";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/", announcementRoutes);

app.use(
  (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error Middleware -----\nError: ", error);

    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong.";
    const errorData = error.data || null;

    res.status(status).json({
      message,
      data: errorData,
    });
  }
);

mongoose.connect(
    process.env.MONGO_URI || ""
).then(res=>{
    console.log("MongoDB Connected");
    app.listen(8000);
    console.log(`server running on port: ${PORT}`);
}).catch(err=>{
    console.log("Database Connection Failure:\n", err);
});
