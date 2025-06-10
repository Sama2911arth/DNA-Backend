const express = require("express");
const cors = require("cors");

const routes = require("./src/routes/index.route");
require("dotenv").config();
const helmet = require("helmet");
const errorHandler = require("./src/middleware/errorHandler.middleware");
const cookieParser = require("cookie-parser")
const app = express();


app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());



app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
