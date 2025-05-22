const mongoose = require("mongoose");
const User = require("./user");

const PermissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Role",
  },
});

PermissionSchema.post("save", async function () {
  const Permission = mongoose.model("Permission");

  const permissions = await Permission.find({ user: this.user }).populate(
    "role"
  );

  /*
  permissions = [
    {
      _id: asdasdasdasd,
      user: obj_id(asdasdasdasd),
      role: {
        _id: asdjasdkasdlkasd,
        name: admin
      }
    },
    {
      _id: asdasdas12312312dasd,
      user: obj_id(asdasdasdasd),
      role: {
        _id: asdjasdka123123sdlkasd,
        name: user
      }
    },
    ]
  */

  const roles = permissions.map((p) => p.role.name);

  // roles = ["user", "admin"]

  await User.findByIdAndUpdate(this.user, { roles });
});

PermissionSchema.post("deleteOne", { document: true }, async function () {
  const Permission = mongoose.model("Permission");

  const permissions = await Permission.find({ user: this.user }).populate(
    "role"
  );
  const roles = permissions.map((p) => p.role.name);

  await User.findByIdAndUpdate(this.user, { roles });
});

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
