import mongoose from "mongoose";

const shelterRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    people: {
      type: Number,
      required: true,
      min: 1,
    },

    shelter: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const ShelterRequest =
  mongoose.model(
    "ShelterRequest",
    shelterRequestSchema
  );

export default ShelterRequest;