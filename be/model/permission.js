const mongoose = require("mongoose")


const PermissionSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }
})


PermissionSchema.post("save", async function(){
    const Permission = mongoose.model("Permission")
    const user = mongoose.model("User")

    const perm = await Permission.find({user: this.user}).populate("role")

    const roles = perm.map((p) => p.role.name) 

    await user.findByIdAndUpdate(this.user, {roles})
    

})
PermissionSchema.pre("deleteOne",{document: true}, async function(){
    const Permission = mongoose.model("Permission")
    const user = mongoose.model("User")

    const perm = await Permission.find({user: this.user}).populate("role")

    const roles = perm.map((p) => p.role.name) 

    await user.findByIdAndDelete(this.user, {roles})
    

})

const Permission = mongoose.model("Permission", PermissionSchema)

module.exports = Permission 