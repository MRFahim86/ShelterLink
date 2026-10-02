import express from "express";

import {
  createHelpRequest,
  getAllHelpRequests,
  updateHelpRequestStatus,
  deleteHelpRequest,
} from "../controllers/helpController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// User submits help request
router.post("/", createHelpRequest);


// Admin gets all requests
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllHelpRequests
);


// Admin updates request status
router.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  updateHelpRequestStatus
);


// Admin deletes request
router.delete(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  deleteHelpRequest
);

export default router;