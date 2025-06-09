
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import purchaseCourseRoutes from "./routes/purchaseCourse.route.js";
import path from "path";

// ✅ Swagger setup
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS API Documentation",
      version: "1.0.0",
      description: "API documentation for the LMS backend",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust this if your routes are in a different folder
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
<<<<<<< HEAD
    origin: "https://eduflex-6csh.onrender.com",
=======
    origin: "http://localhost:5173",
>>>>>>> c8e1c5d48b398424d8e8955d4dc6c570f6bcdb5a
    credentials: true,
  })
);

//////////////////
const _dirname = path.resolve();
/////////////////




// ✅ Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// APIs
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api", purchaseCourseRoutes);


////////////////////////
app.use(express.static(path.join(_dirname, "client/dist")));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});
/////////////////////

// Start server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
