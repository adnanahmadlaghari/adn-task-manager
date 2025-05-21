const mongoose = require("mongoose");
const Task = require("./task");
const Permission = require("./permissions");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
    roles: [String],
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "author",
});

UserSchema.post("findOneAndDelete", async function (doc) {
  await Task.deleteMany({ author: doc.id });
  await Permission.deleteMany({ user: doc.id });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
