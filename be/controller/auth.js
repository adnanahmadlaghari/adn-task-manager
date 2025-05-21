const argon2 = require("argon2");
const User = require("../model/user");
const Permission = require("../model/permissions");
const Role = require("../model/roles");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  };

  const accessToken = jwt.sign(
    payload,
    process.env.SECRET_KEY || "mashhadlaghari1234",
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_SECRET_KEY || "mashhadlaghari1234",
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  try {
    const { first_name, last_name, username, password, profile, role } =
      req.body;

    const hashedPassword = await argon2.hash(password);

    const data = {
      first_name,
      last_name,
      username,
      password: hashedPassword,
      profile,
    };
    const role_instance = await Role.find({ name: role });
    if (role_instance.length === 0)
      return res.status(404).json({ error: "role is wrong" });

    const user = await User.create(data);
    await Permission.create({ user: user._id, role: role_instance[0]._id });

    const { accessToken, refreshToken } = generateToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: `${Object.keys(error.keyValue)[0]}: (${
          error.keyValue[Object.keys(error.keyValue)[0]]
        }) already exist!`,
      });
    } else {
      res.status(500).send("Failed to create user error");
    }
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("user not found");
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: "invalid credential",
      });
    }
    const { accessToken, refreshToken } = generateToken(user);

    const res_user = await User.findOne({ username }, { password: 0 });

    res.status(201).json({ accessToken, refreshToken, user: res_user });
  } catch (error) {
    res.status(500).send("Failed to login user error");
    console.log(error);
  }
};

module.exports = { register, login };
