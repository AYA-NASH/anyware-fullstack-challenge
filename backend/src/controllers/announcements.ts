import { Request, Response, NextFunction } from "express";
import { Announcement } from "../models/announcements";
import mongoose from "mongoose";

interface AnnouncementRequestBody {
  senderName: string;
  senderRole: string;
  content: string;
}

export const getAnnouncements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const announcements = await Announcement.find(); 

    res.status(200).json({
      message: "Announcements fetched successfully",
      result: announcements,
    });
  } catch (err) {
    next(err);
  }
};

export const createAnnouncement = async (
  req: Request<{}, {}, AnnouncementRequestBody>, 
  res: Response,
  next: NextFunction
) => {
  const { senderName, senderRole, content } = req.body; 

  if (!senderName || !senderRole || !content) { 
    return res.status(400).json({ message: "Sender name, sender role, and content are required" });
  }

  try {
    const newAnnouncement = new Announcement({
      senderName: senderName, 
      senderRole: senderRole, 
      content: content 
    });

    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json({
      message: "New Announcement added!",
      result: savedAnnouncement
    });

  } catch (err) {
    next(err);
  }
};

export const updateAnnouncement = async (
  req: Request<{ id: string }, {}, AnnouncementRequestBody>, 
  res: Response,
  next: NextFunction
) => {
  const announcementId = req.params.id;

  if (!announcementId) {
    return res.status(400).json({ message: "Announcement ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const fetchedAnnouncement = await Announcement.findById(announcementId);

    if (!fetchedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" }); 
    }

    const { senderName, senderRole, content } = req.body;

    if (senderName !== undefined) fetchedAnnouncement.senderName = senderName; 
    if (senderRole !== undefined) fetchedAnnouncement.senderRole = senderRole;
    if (content !== undefined) fetchedAnnouncement.content = content;

    const savedAnnouncement = await fetchedAnnouncement.save();

    res.status(200).json({
      message: "Announcement updated successfully!",
      result: savedAnnouncement,
    });

  } catch (err) {
    next(err);
  }
};

export const deleteAnnouncement = async (
  req: Request<{ id: string }>, 
  res: Response,
  next: NextFunction
) => {
  const announcementId = req.params.id;

  if (!announcementId) {
    return res.status(400).json({ message: "Announcement ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try {
    const deleted = await Announcement.findByIdAndDelete(announcementId);

    if (!deleted) {
      const error: any = new Error("Announcement not found!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "Announcement deleted successfully!"
    });

  } catch (err) {
    next(err);
  }
};