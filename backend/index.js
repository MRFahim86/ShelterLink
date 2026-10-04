import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import donationRoute from "./routes/donationRoute.js";
import helpRoute from "./routes/helpRoute.js";
import carbonMiddleware from "./middleware/carbonMiddleware.js";

import serviceRoutes from "./routes/serviceRoutes.js";
import shelterRoute from "./routes/shelterRoute.js";

dotenv.config();

const app = express();

// MIDDLEWARE

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(carbonMiddleware);

// TEST ROUTE

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend server is running",
  });
});

// EXISTING ROUTES

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/donations", donationRoute);
app.use("/help", helpRoute);

// SERVICE & SHELTER ROUTES

app.use("/api/services", serviceRoutes);
app.use("/api/shelter-requests", shelterRoute);

// MONGODB

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
