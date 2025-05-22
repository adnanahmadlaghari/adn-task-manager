const argon2 = require("argon2");
const User = require("../model/user");
const Role = require("../model/Role")
const Permission = require("../model/permission")
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
    const { first_name, last_name, username, password, profile, role, } = req.body;

    const hashedPassword = await argon2.hash(password)

    const data = {
      first_name,
      last_name,
      username,
      password : hashedPassword,
      profile,
      role,
    };
    const user = await User.create(data);
   let findRole = await Role.find({name: role})
    if (findRole.length === 0) {
      response.status(404).json({msg: "wrong role"})
    }
    await Permission.create({user: user._id, role: findRole[0]._id})
    
    const { accessToken, refreshToken } = generateToken(user);

    res.status(201).json({ accessToken, refreshToken, user });
  } catch (error) {
    if(error.code === 11000){
       res.status(400).json({
        error: `${Object.keys(error.keyValue)[0]}: (${error.keyValue[Object.keys(error.keyValue)[0]]}) already exist!`
      })
    }else{
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

    const isPasswordValid = await argon2.verify(user.password, password)
    if(!isPasswordValid){
      return res.status(401).json({
        msg: "invalid credential"
      })
    }
    const { accessToken, refreshToken } = generateToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send("Failed to login user error");
    console.log(error)
  }
};

module.exports = { register, login };
