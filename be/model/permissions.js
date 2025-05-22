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
  const roles = permissions.map((p) => p.role.name);

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
