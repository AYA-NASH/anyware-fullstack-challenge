// controllers/assignments.ts
import { Request, Response, NextFunction } from "express";
import { Assignment } from "../models/assignment";
import mongoose from "mongoose";

interface AssignmentRequestBody {
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  description?: string;
}

export const getAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      message: "Assignments fetched successfully",
      result: assignments,
    });
  } catch (err) {
    next(err);
  }
};

export const getAssignmentById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const assignmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: "Invalid assignment ID" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment fetched successfully",
      result: assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const createAssignment = async (
  req: Request<{}, {}, AssignmentRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, course, topic, dueDate, description } = req.body;

    if (!title || !course || !topic || !dueDate) {
      return res.status(400).json({
        message: "Missing required fields: title, course, topic, or dueDate",
      });
    }

    const newAssignment = new Assignment({
      title,
      course,
      topic,
      dueDate: new Date(dueDate),
      description,
    });

    const savedAssignment = await newAssignment.save();

    res.status(201).json({
      message: "Assignment created successfully",
      result: savedAssignment,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (
  req: Request<{ id: string }, {}, Partial<AssignmentRequestBody>>,
  res: Response,
  next: NextFunction
) => {
  const assignmentId = req.params.id;

  if (!assignmentId) {
    return res.status(400).json({ message: "Assignment ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
    return res.status(400).json({ message: "Invalid assignment ID" });
  }

  try {
    const fetchedAssignment = await Assignment.findById(assignmentId);

    if (!fetchedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const { title, course, topic, dueDate, description } = req.body;

    if (title !== undefined) fetchedAssignment.title = title;
    if (course !== undefined) fetchedAssignment.course = course;
    if (topic !== undefined) fetchedAssignment.topic = topic;
    if (dueDate !== undefined) fetchedAssignment.dueDate = new Date(dueDate);
    if (description !== undefined) fetchedAssignment.description = description;

    const savedAssignment = await fetchedAssignment.save();

    res.status(200).json({
      message: "Assignment updated successfully",
      result: savedAssignment,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAssignment = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const assignmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
      return res.status(400).json({ message: "Invalid assignment ID" });
    }

    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};