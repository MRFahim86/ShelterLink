import express from "express";

import {
  createDonation,
  getMyDonations,
} from "../controllers/donationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create donation
router.post("/", authMiddleware, createDonation);

// Get logged-in user's donations
router.get("/my", authMiddleware, getMyDonations);

export default router;