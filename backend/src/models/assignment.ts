import mongoose from "mongoose";

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: String,
}, { timestamps: true });

export const Assignment = mongoose.model("Assignment", assignmentSchema);