const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  rol: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = model('Role', RoleSchema);

module.exports = Role;
