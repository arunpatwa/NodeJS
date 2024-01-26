const express = require("express");
const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./db/connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8080;

uri =
  "mongodb+srv://arunspatwa14:arunpatwa.14@cluster-piyush.s3v0qrs.mongodb.net/cluster-piyush?retryWrites=true&w=majority";
//connectiong with mongoDB
connectMongoDB(uri);

// creating other middlewares
//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
logReqRes("log.txt");

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Servers is running in ${PORT}`));
