import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});


mongoose.connect(
    process.env.MONGO_URI || ""
).then(res=>{
    console.log("MongoDB Connected");
    app.listen(8000);
    console.log(`server running on port: ${PORT}`);
}).catch(err=>{
    console.log("Database Connection Failure:\n", err);
});
