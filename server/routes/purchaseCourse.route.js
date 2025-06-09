
















/**
 * @swagger
 * /api/v1/purchase:
 *   get:
 *     summary: Get all purchased courses
 *     responses:
 *       200:
 *         description: A list of purchases
 */


////////////////////////////////////////////////////////////////////////////////////////////////



import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook,  getPurchasedCourses } from "../controllers/coursePurchase.controller.js";
import * as coursePurchaseController from '../controllers/coursePurchase.controller.js';



const router = express.Router();


router.get("/purchased-courses", isAuthenticated, getPurchasedCourses);



router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus);

router.route("/").get(isAuthenticated,getAllPurchasedCourse);


export default router;