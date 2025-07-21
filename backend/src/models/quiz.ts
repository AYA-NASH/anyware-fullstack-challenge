import mongoose from "mongoose";

const Schema = mongoose.Schema;

function arrayLimit(val: any) {
  return Array.isArray(val) && val.length >= 2;
}

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,
  duration: Number,

  startDate: Date,
  endDate: Date,
  totalMarks: Number,

  questions: [
    {
      questionText: { type: String, required: true },
      options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least 2 options']
      },
      correctOptionIndex: { type: Number, required: true }
    }
  ],
}, { timestamps: true });

export const Quiz = mongoose.model("Quiz", quizSchema);
