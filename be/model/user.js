const mongoose = require("mongoose")
const Task = require("./task")

const UserSchema = new mongoose.Schema({
    first_name : {
        type: String
    },
    last_name : {
        type: String
    },
    username : {
        type: String,
        unique: true
    },
    password : {
        type: String
    },
    roles: [String],
    profile : {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at : {
        type: Date,
        default: Date.now()
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})

UserSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "author",
})

// UserSchema.pre("save", async function(next) {
//     if(!this.isModified("password")) return next();
//     try {
//         const hashedPassword = await argone2.hash(this.password)
//         this.password= hashedPassword;
//         next()
//     } catch (error) {
//         next()
//     }
// })

UserSchema.post('findOneAndDelete', async function (doc) {
    await Task.deleteMany({ author: doc.id });
});


const User = mongoose.model("User", UserSchema)

module.exports = User