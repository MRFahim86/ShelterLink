import HelpRequest from "../models/HelpRequest.js";

// ================= CREATE HELP REQUEST =================

export const createHelpRequest = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        message: "All help request information is required",
      });
    }

    const helpRequest = await HelpRequest.create({
      name,
      phone,
      message,
    });

    res.status(201).json({
      message: "Help request submitted successfully",
      helpRequest,
    });

  } catch (error) {
    console.log("Help request error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= GET ALL HELP REQUESTS =================

export const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find()
      .sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {
    console.log(
      "Get help requests error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= UPDATE STATUS =================

export const updateHelpRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const request = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        message: "Help request not found",
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      request,
    });

  } catch (error) {
    console.log(
      "Update help request error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ================= DELETE REQUEST =================

export const deleteHelpRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findByIdAndDelete(
      req.params.id
    );

    if (!request) {
      return res.status(404).json({
        message: "Help request not found",
      });
    }

    res.status(200).json({
      message: "Help request deleted successfully",
    });

  } catch (error) {
    console.log(
      "Delete help request error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};