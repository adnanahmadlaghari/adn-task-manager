const Task = require("../model/task");

const createTask = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const user = req.user;
    const data = {
      author: user._id,
      title,
      content,
    };
    const task = await Task.create(data);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getMyTask = async(req, res) => {
  try {
    const {id} = req.user
    const tasks =  await Task.find({author: id})
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).send("internal server error");
  }
}

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { id } = req.params;
    const data = req.body;

    if (data.author) {
      return res.status(401).send({ error: "bad input" });
    }

    const task = await Task.findOneAndUpdate({ author: userID, _id: id }, data);

    if (!task) return res.status(404).json({ error: "task not found" });

    res.status(200).json({ success: "task updated" });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ author: userID, _id: id });
    if (!task) return res.status(404).json({ error: "task not found" });
    res
      .status(200)
      .json({ msg: `Task With This ID: ${id} Deleted Successfully` });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getMyTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
