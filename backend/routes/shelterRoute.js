import express from "express";

import {
  createShelterRequest,
  getAllShelterRequests,
  updateShelterRequestStatus,
  deleteShelterRequest,
} from "../controllers/shelterController.js";

const router = express.Router();

// User submits shelter request
router.post("/", createShelterRequest);

// Admin gets all shelter requests
router.get("/admin", getAllShelterRequests);

// Admin updates request status
router.put(
  "/admin/:id",
  updateShelterRequestStatus
);

// Admin deletes request
router.delete(
  "/admin/:id",
  deleteShelterRequest
);

export default router;