import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    purpose: {
      type: String,
      required: true,
      enum: ["Food", "Shelter", "Medical"],
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["bKash", "Rocket"],
    },

    accountNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;