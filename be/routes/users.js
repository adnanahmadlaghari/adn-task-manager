const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deletedUser,
} = require("../controller/user");

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).patch(updateUser).delete(deletedUser);
userRouter.route("/single").get(getSingleUser);

module.exports = userRouter;
