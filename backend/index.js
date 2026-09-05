import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();



app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());



app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend server is running"
  });
});



app.use("/auth", authRoute);


// Port
const PORT = process.env.PORT || 4000;



mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  })
  .catch((error) => {

    console.log(
      "MongoDB connection failed:",
      error.message
    );

  });