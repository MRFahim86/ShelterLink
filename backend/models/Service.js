import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["shelter", "food", "medical", "volunteer"]
    },

    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    contact: {
      type: String
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;