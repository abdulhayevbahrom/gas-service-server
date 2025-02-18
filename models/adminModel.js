const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "admin" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
