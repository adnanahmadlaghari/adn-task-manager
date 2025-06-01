const express = require("express");
const cors = require("cors");
const ConnectDB = require("./db/connect");
const taskRouter = require("./routes/task");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
require("dotenv").config();
const passport = require("passport");
require("./jwt/accessToken");
const http = require("http");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
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

io.on("connection", (socket) => {
  socket.broadcast.emit("connection", "hi a new user has connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
});

PORT = 5000;

const Start = async () => {
  try {
    await ConnectDB(process.env.MONGODB_URI);
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
