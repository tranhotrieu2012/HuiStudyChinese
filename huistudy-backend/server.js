const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const classesRoutes = require('./routes/class.routes');

// ----- Auth -----
app.use("/api/auth", authRoutes);

// ----- User -----
app.use('/api/users', userRoutes)

// ----- Classes -----
app.use('/api/classes', classesRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log("Server chạy cổng " + process.env.PORT);
});
