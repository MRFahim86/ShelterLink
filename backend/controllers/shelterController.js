import ShelterRequest from "../models/ShelterRequest.js";

// ================= CREATE SHELTER REQUEST =================

export const createShelterRequest = async (req, res) => {
  try {
    const {
      name,
      phone,
      people,
      shelter,
      location,
      type,
    } = req.body;

    if (
      !name ||
      !phone ||
      !people ||
      !shelter ||
      !location ||
      !type
    ) {
      return res.status(400).json({
        message: "All shelter request information is required",
      });
    }

    const request = await ShelterRequest.create({
      name,
      phone,
      people,
      shelter,
      location,
      type,
      status: "Pending",
    });

    res.status(201).json({
      message: "Shelter request submitted successfully",
      request,
    });
  } catch (error) {
    console.log(
      "Shelter request error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= GET ALL SHELTER REQUESTS =================

export const getAllShelterRequests = async (req, res) => {
  try {
    const requests = await ShelterRequest.find()
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.log(
      "Get shelter requests error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= UPDATE STATUS =================

export const updateShelterRequestStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (
      !["Pending", "Approved", "Rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const request =
      await ShelterRequest.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!request) {
      return res.status(404).json({
        message: "Shelter request not found",
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      request,
    });
  } catch (error) {
    console.log(
      "Update shelter request error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= DELETE REQUEST =================

export const deleteShelterRequest = async (
  req,
  res
) => {
  try {
    const request =
      await ShelterRequest.findByIdAndDelete(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message: "Shelter request not found",
      });
    }

    res.status(200).json({
      message:
        "Shelter request deleted successfully",
    });
  } catch (error) {
    console.log(
      "Delete shelter request error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};