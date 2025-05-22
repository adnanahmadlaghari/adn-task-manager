const express = require("express");
const pagination = require("../middlewares/pagination");
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  getMyTask,
} = require("../controller/task");

const taskRouter = express.Router();

taskRouter.route("/").post(createTask).get(pagination(3), getAllTasks);
taskRouter.route("/mytask").get(getMyTask);

taskRouter
  .route("/:id")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = taskRouter;
