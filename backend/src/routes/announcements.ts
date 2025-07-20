import express from "express";

import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from "../controllers/announcements";

const router = express.Router();

router.get("/announcements", getAnnouncements);

router.post("/announcements", createAnnouncement);

router.put("/announcements/:id", updateAnnouncement);

router.delete("/announcements/:id", deleteAnnouncement);

export default router;
