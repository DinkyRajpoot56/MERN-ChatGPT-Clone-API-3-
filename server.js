const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

//routes path
const authRoutes = require("./routes/authRoutes");

//rest object
const app = express();

//dotenv
dotenv.config();

//mongo connection
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);

//listen server
app.listen(8080, () => {
    console.log(`Server Running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan
      .white);
});