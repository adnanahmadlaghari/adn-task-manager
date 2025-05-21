const mongoose = require("mongoose")


const TaskSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
});

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task