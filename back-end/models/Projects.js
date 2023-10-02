import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  text: String,
  status: {
    type: String,
    enum: ["completed", "pending"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  color: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  tasks: [TaskSchema],
});

export const Project = mongoose.model("Projects", ProjectSchema);
