import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    senderName: { 
      type: String,
      required: true,
      trim: true,
    },
    senderRole: { 
      type: String,
      required: true, 
      trim: true,
    },
    content: { 
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

export const Announcement = mongoose.model("Announcement", announcementSchema);