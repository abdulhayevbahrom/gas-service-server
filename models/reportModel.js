const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    balon: { type: Object },
    zapchast: { type: Array },
    price: { type: Number, required: true }, // qanchaga ornagani
    avto_number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Report", reportSchema);
