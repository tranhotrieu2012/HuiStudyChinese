const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const classesRoutes = require("./routes/class.routes");
const lessonsRoutes = require("./routes/lesson.routes");
const lessonMaterialRoutes = require("./routes/lesson_material.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const homeworkRoutes = require("./routes/homework.routes");

// ----- Auth -----
app.use("/api/auth", authRoutes);

// ----- User -----
app.use("/api/users", userRoutes);

// ----- Classes -----
app.use("/api/classes", classesRoutes);

// ----- Lessons -----
app.use("/api", lessonsRoutes);

// ----- Lesson materials -----
app.use("/api", lessonMaterialRoutes);

// ----- Attendance -----
app.use("/api", attendanceRoutes);

// ----- Homework and submission -----
app.use("/api", homeworkRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server chạy cổng " + process.env.PORT);
});
