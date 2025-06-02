const express = require("express");
const cors = require("cors");
const ConnectDB = require("./db/connect");
const User = require("./model/user");
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
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust based on your frontend
    // methods: ["GET", "POST"],
    credentials: false,
  },
});
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

const userSocketMap = new Map(); // userId -> socket.id

io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id); // check this logs
  // User registration (client must send this after connecting)
  socket.on("register", (userId) => {
    if (!userId) return;

    userSocketMap.set(userId, socket.id);
    io.emit("online_users", Array.from(userSocketMap.keys()));
    console.log(`✅ Registered user ${userId} with socket ${socket.id}`);
  });

  socket.on("chat message", async (msg) => {
    const { userId, toUserId, text } = msg;

    if (!userId || !toUserId || !text) {
      socket.emit("chat message", {
        error: "⚠️ userId, toUserId, and text are required",
      });
      return;
    }
    try {
      const sender = await User.findById(userId);
      if (!sender) {
        socket.emit("chat message", { error: "⚠️ Invalid sender userId" });
        return;
      }

      const recipientSocketId = userSocketMap.get(toUserId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("chat message", {
          from: sender.username,
          text,
        });
        console.log(`📨 ${userId} → ${toUserId}: ${text}`);
      } else {
        socket.emit("chat message", {
          info: "ℹ️ User is offline or not registered with socket",
        });
      }
    } catch (error) {
      console.log("❌ Error handling chat message:", error);
      socket.emit("chat message", { error: "❌ Server error" });
    }
  });
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    // Remove from userSocketMap
    for (const [userId, sId] of userSocketMap.entries()) {
      if (sId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`🗑️ Removed user ${userId} from socket map`);
        break;
      }
    }
    io.emit("online_users", Array.from(userSocketMap.keys()));
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
