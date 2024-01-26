const http = require("http");
const fs = require("fs");
const url = require("url");

// express helps us to remove these handler function, writing multiple switch cases for the routes
function myHandler(req, res) {
  log = `Request Received at : ${Date.now()} from ${req.url} \n`;
  fs.appendFile("logs.txt", log, (err, result) => {
    switch (req.url) {
      case "/":
        res.end("Homepage");
        break;
      case "/about":
        res.end("This is Arun");
        break;
      default:
        res.end("Not Found 404");
    }
  });
}

const myServer = http.createServer(myHandler);

PORT = 8080;
myServer.listen(PORT, console.log(`Serve is running on ${PORT}`));
