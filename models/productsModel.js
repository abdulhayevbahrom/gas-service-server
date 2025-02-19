const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = model("Product", productSchema);
