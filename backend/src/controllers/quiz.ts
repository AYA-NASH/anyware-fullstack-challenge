import { Request, Response, NextFunction } from "express";
import { Quiz } from "../models/quiz";
import mongoose from "mongoose";

interface QuizRequestBody {
  title: string;
  description?: string;
  duration: number;
  startDate?: string;
  endDate?: string;
  totalMarks: number;
  questions: Array<{
    questionText: string;
    options: string[];
    correctOptionIndex: number;
  }>;
  course: string;
  topic: string;
  dueDate: string;
}

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
    req: Request<{ id: string }>,
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
    req: Request<{}, {}, QuizRequestBody>,
    res: Response,
    next: NextFunction
) => {
  try {
    const { title, description, duration, startDate, endDate, totalMarks, questions, course, topic, dueDate } = req.body;

    if (!title || !duration || !totalMarks || !Array.isArray(questions) || questions.length < 1 || !course || !topic || !dueDate) {
        return res.status(400).json({
            message: "Missing required fields: title, duration, totalMarks, questions, course, topic, or dueDate",
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
        course,
        topic,
        dueDate: new Date(dueDate),
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
  req: Request<{ id: string }, {}, Partial<QuizRequestBody>>,
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

    const { title, description, duration, startDate, endDate, totalMarks, questions, course, topic, dueDate } = req.body;

    if (title !== undefined) fetchedQuiz.title = title;
    if (description !== undefined) fetchedQuiz.description = description;
    if (duration !== undefined) fetchedQuiz.duration = duration;
    if (questions !== undefined) fetchedQuiz.questions = questions;
    if (totalMarks !== undefined) fetchedQuiz.totalMarks = totalMarks;
    if (startDate !== undefined) fetchedQuiz.startDate = startDate;
    if (endDate !== undefined) fetchedQuiz.endDate = endDate;
    if (course !== undefined) fetchedQuiz.course = course;
    if (topic !== undefined) fetchedQuiz.topic = topic;
    if (dueDate !== undefined) fetchedQuiz.dueDate = new Date(dueDate);

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
    req: Request<{ id: string }>,
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