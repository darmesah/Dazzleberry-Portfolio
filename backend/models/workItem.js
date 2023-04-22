const mongoose = require("mongoose");

const { Schema } = mongoose;

const workItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    workDesc: {
      type: String,
      required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    service: [
      {
        type: String,
        required: true,
      },
    ],
    description: [
      {
        type: String,
        required: true,
      },
    ],
    industry: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorkItem", workItemSchema);
