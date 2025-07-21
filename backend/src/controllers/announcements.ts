import { Request, Response, NextFunction } from "express";
import { Announcement } from "../models/announcements";
import mongoose from "mongoose";

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
  req: Request,
  res: Response,
  next: NextFunction
) =>{

  const {title, content} = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try{

    const newAnnouncement = new Announcement({
      title: title,
      content: content
    });

    const savedAnnouncement = await newAnnouncement.save();

    res.status(201).json({
      message: "new Announcment Added!",
      result: savedAnnouncement
    });

  } catch(err){
    next(err);
  }
};

export const updateAnnouncement = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>{
  const announcementId = req.params.id;
  
  if (!announcementId) {
    return res.status(400).json({ message: "Announcement ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(announcementId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }

  try{
    const fetchedAnnouncement = await Announcement.findById(announcementId);
    
    if (!fetchedAnnouncement) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    
    const {title, content} = req.body;

    if(title) fetchedAnnouncement.title = title;
    if(content) fetchedAnnouncement.content = content;

    const savedAnnouncement = await fetchedAnnouncement.save();

    res.status(200).json({
      message: "Announcement updated successfully!",
      result: savedAnnouncement,
    });

  } catch(err){
    next(err);
  }


};

export const deleteAnnouncement = async (
  req: Request,
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
