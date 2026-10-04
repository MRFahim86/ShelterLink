import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import serviceRoutes from "./routes/serviceRoutes.js";
import shelterRoute from "./routes/shelterRoute.js";

dotenv.config();

const app = express();


// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: "http://localhost:5180",
    credentials: true,
  })
);

app.use(express.json());


// ================= ROUTES =================

app.use("/api/services", serviceRoutes);

app.use(
  "/api/shelter-requests",
  shelterRoute
);


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.json({
    message: "ShelterLink API is running",
  });
});


// ================= MONGODB =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(4000, () => {
      console.log(
        "Server running on http://localhost:4000"
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error.message
    );
  });