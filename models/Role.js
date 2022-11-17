const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    default: 'USER_ROLE'
  },
});

module.exports = model("Role", RoleSchema);

