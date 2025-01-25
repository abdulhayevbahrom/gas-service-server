const { Schema, model } = require("mongoose");

const workersSChema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Workers", workersSChema);
