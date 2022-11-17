const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    default: 'USER_ROLE'
  },
});

const Role = model("Role", RoleSchema);

module.exports = Role
