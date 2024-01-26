require("dotenv").config();

const express = require("express");

const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./db/connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8080;

//connectiong with mongoDB
connectMongoDB(process.env.MONGODB_URI);

// creating other middlewares
//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
logReqRes("log.txt");

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Servers is running in ${PORT}`));
