const User = require("../model/user");
const argon2 = require("argon2");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("tasks");
    res.status(201).json({ users });
  } catch (error) {
    res.status(500).send("Failed to get user error");
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({username}).populate("tasks");
    if(!user) return res.status(404).json({msg: "User Not Found!"})
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("Failed to get single user");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { first_name, last_name, username, password, profile } = req.body;
    const data = {
      first_name,
      last_name,
      username,
      password,
      profile,
    };
    if (password) {
      const hashPassword = await argon2.hash(password);
      data.password = hashPassword;
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ user });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: `${Object.keys(error.keyValue)[0]}: (${
          error.keyValue[Object.keys(error.keyValue)[0]]
        }) already exist!`,
      });
    } else {
      res.status(500).send("Failed to update user error");
    }
  }
};

const deletedUser = async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOneAndDelete({username: username});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Failed to delete user");
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deletedUser,
};
