const express = require("express");
const cors = require("cors");
const ConnectDB = require("./db/connect");
const taskRouter = require("./routes/task");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
require("dotenv").config();
const passport = require("passport");
require("./jwt/accessToken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/auth", authRouter);
app.use("/tasks", passport.authenticate("jwt", { session: false }), taskRouter);
// app.use("/tasks", taskRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);

app.get("/", (req, res) => {
  res.send("hello word");
});

PORT = 5000;

const Start = async () => {
  try {
    await ConnectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
