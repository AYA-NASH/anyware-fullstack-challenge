import express from "express";
import { createQuiz, deleteQuiz, getQuizById, getQuizzes, updateQuiz } from "../controllers/quiz";

const router = express.Router();

router.get("/", getQuizzes);

router.post("/", createQuiz);

router.get("/:id", getQuizById);

router.put("/:id", updateQuiz);

router.delete("/:id", deleteQuiz);

export default router;