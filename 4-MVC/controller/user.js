const User = require("../models/user");
async function handleGetAllUsers(req, res) {
  const allUserDB = await User.find({});
  res.setHeader("X-MyName", "Arun Patwa");
  return res.json(allUserDB);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.Userid);
  if (!user) return res.status(400).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.Userid, {
    last_name: "last name changed",
  });
  return res.json({ status: " Successfully Changed " });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.Userid);
  res.send({ status: "Succesfully Deleted User" });
}

async function handleCreateNewUser(req, res) {
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
  // console.log("result", result);
  return res
    .status(201)
    .json({ msg: "successfully added the user", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
