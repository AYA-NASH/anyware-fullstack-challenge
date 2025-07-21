import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/quiz";
import mongoose from "mongoose";

export const getQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      message: "Quizzes fetched successfully",
      result: quizzes,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuizById = async (
    req: Request,
    res: Response, 
    next: NextFunction
) => {
  try {
    const quizId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz fetched successfully",
      result: quiz,
    });
  } catch (err) {
    next(err);
  }
};

export const createQuiz = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

  try {

    const { title, description, duration, startDate, endDate, totalMarks, questions } = req.body;

    if (!title || !startDate || !Array.isArray(questions) || questions.length < 1 || !duration || !totalMarks) {
        return res.status(400).json({
            message: "Missing required fields: title, startDate, duration, or questions",
        });
    }

    for (const question of questions) {
      if (
        !question.questionText ||
        !Array.isArray(question.options) ||
        question.options.length < 2 ||
        typeof question.correctOptionIndex !== 'number'||
        question.correctOptionIndex > question.options.length - 1
      ) {
        return res.status(400).json({
          message: "Each question must have questionText, at least 2 options, and correctOptionIndex",
        });
      }
    }

    const newQuiz = new Quiz({
        title,
        description,
        duration,
        startDate,
        endDate,
        totalMarks,
        questions,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      result: savedQuiz,
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const quizId = req.params.id;

  if (!quizId) {
    return res.status(400).json({ message: "Quiz ID is required." });
  }

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    return res.status(400).json({ message: "Invalid quiz ID" });
  }

  try {
    const fetchedQuiz = await Quiz.findById(quizId);
    
    if (!fetchedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const { title, description, duration, startDate, endDate, totalMarks, questions } = req.body;

    if (title) fetchedQuiz.title = title;
    if (description) fetchedQuiz.description = description;
    if (duration) fetchedQuiz.duration = duration;
    if (questions) fetchedQuiz.questions = questions;
    if (totalMarks) fetchedQuiz.totalMarks = totalMarks;
    if (startDate) fetchedQuiz.startDate = startDate;
    if (endDate) fetchedQuiz.endDate = endDate;

    const savedQuiz = await fetchedQuiz.save();

    res.status(200).json({
      message: "Quiz updated successfully",
      result: savedQuiz,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuiz = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
  try {
    const quizId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz deleted successfully",
    });

  } catch (err) {
    next(err);
  }
};