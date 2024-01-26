const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controller/user");

// create an instance of the express router
const router = express.Router();

router.
route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:Userid")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
