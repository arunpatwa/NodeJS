const fs = require("fs");

function logReqRes(filename) {
  return (req, res) => {
    fs.appendFile(
      filename,
      `Time : ${Date.now()} Method:${req.method}  url:${req.url} ip:${
        req.ip
      } \n `,
      (req, res) => {
        console.log("Hello from Middleware 1");
        next();
      }
    );
  };
}

module.exports={logReqRes}
