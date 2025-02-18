const Ajv = require("ajv");
const { error } = require("../utils/response");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);

const productValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, maxLength: 20 },
      price: { type: "number" },
      selling_price: { type: "number" },
      category: { type: "string" },
      quantity: { type: "number" },
    },
    required: ["name", "price", "selling_price", "category", "quantity"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: "Iltimos, mahsulot nomini kiriting!",
        price: "Iltimos, mahsulot narhini kiriting!",
        selling_price: "Iltimos, sotish narhini kiriting!",
        category: "Iltimos, turini kiriting!",
        quantity: "Iltimos, miqdorini kiriting!",
      },
      properties: {
        name: "Iltimos, mahsulot nomini kiriting!",
        price: "Iltimos, mahsulot narhini kiriting!",
        selling_price: "Iltimos, sotish narhini kiriting!",
        category: "Iltimos, turini kiriting!",
        quantity: "Iltimos, miqdorini kiriting!",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);
  if (!result) return error(res, validate.errors[0].message);
  next();
};

module.exports = productValidation;
