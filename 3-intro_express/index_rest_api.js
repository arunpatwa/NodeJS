const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const { error } = require("console");
const app = express();

const PORT = 8080;

//connectiong with mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// creating other middlewares

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `Time : ${Date.now()} Method:${req.method}  url:${req.url} ip:${
      req.ip
    } \n `,
    (req, res) => {
      console.log("Hello from Middleware 1");
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("Hello from Middleware 2");
  // return res.send("Hey")
  next();
});

app.get("/", (req, res) => {
  return res.send("Welcome to Homepage");
});

app.get("/users", async (req, res) => {
  const allUserDB = await User.find({});
  const html = `
    <ul>
    ${allUserDB
      .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const allUserDB = await User.find({});
  res.setHeader("X-MyName", "Arun Patwa");
  return res.json(allUserDB);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "Fill all the fields" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender,
    email: body.email,
    job_title: body.job_title,
  });

  console.log("result", result);
  return res.status(201).json({ msg: "successfully added the user" });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   // console.log("body : ", body)
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
});

app
  .route("/api/users/:Userid")
  .get(async (req, res) => {
    // const userid = Number(req.params.Userid);
    // const user = users.find((user) => user.id === userid);
    const user = await User.findById(req.params.Userid);
    if (!user) return res.status(400).json({ error: "user not found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.Userid, {
      last_name: "last name changed",
    });
    return res.json({ status: " Successfully Changed " });
  })

  .put((req, res) => {
    // edit the details of user
    res.send({ status: "pending" });
  })
  .delete(async (req, res) => {
    // delete the user details
    await User.findByIdAndDelete(req.params.Userid);
    res.send({ status: "Succesfully Deleted User" });
  });

app.listen(PORT, () => console.log(`Servers is running in ${PORT}`));
