const mongoose = require("mongoose");

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

    location: {
      type: String
    },

    description: {
      type: String
    },

    contact: {
      type: String
    },

    image: {
      type: String
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Service", serviceSchema);