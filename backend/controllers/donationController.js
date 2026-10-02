import Donation from "../models/Donation.js";

// ================= CREATE DONATION =================

export const createDonation = async (req, res) => {
  try {
    const {
      amount,
      purpose,
      paymentMethod,
      accountNumber,
    } = req.body;

    // Check input
    if (!amount || !purpose || !paymentMethod || !accountNumber) {
      return res.status(400).json({
        message: "All donation information is required",
      });
    }

    // Create donation
    const donation = await Donation.create({
      user: req.user.id,
      amount,
      purpose,
      paymentMethod,
      accountNumber,
    });

    res.status(201).json({
      message: "Donation recorded successfully",
      donation,
    });
  } catch (error) {
    console.log("Donation error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= GET USER DONATIONS =================

export const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (error) {
    console.log("Get donations error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};