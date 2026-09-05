import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You are logged in",
    user: req.user
  });
});

export default router;