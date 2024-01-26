// const http = require("http");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Response from the Home Page");
});
app.get("/about", (req, res) => {
  //http://localhost:8080/about?name=Arun
  res.send(`This is about page of ${req.query.name}`);
});

PORT = 8080;
app.listen(PORT, () => {
    console.log(`Serve is running on ${PORT}`)
});

// const myServer = http.createServer(app);

// myServer.listen(PORT, console.log(`Serve is running on ${PORT}`));
