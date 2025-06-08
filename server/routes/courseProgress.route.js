/**
 * @swagger
 * /api/v1/progress:
 *   get:
 *     summary: Get course progress
 *     responses:
 *       200:
 *         description: Course progress data
 */



import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCourseProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";


const router = express.Router()

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated, updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsInCompleted);




export default router;