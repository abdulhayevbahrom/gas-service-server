const Ajv = require("ajv");
const { error } = require("../utils/response");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);

const expensesValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, maxLength: 50 },
      price: { type: "number", minimum: 0 },
      category: { type: "string", minLength: 2, maxLength: 30 },
    },
    required: ["name", "price", "category"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: "Iltimos, xarajat nomini kiriting!",
        price: "Iltimos, xarajat narxini kiriting!",
        category: "Iltimos, xarajat turini kiriting!",
      },
      properties: {
        name: "Iltimos, xarajat nomini to'g'ri kiriting!",
        price: "Iltimos, xarajat narxini to'g'ri kiriting!",
        category: "Iltimos, xarajat turini to'g'ri kiriting!",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);

  if (!result) {
    let item = validate?.errors[0];
    let message =
      item?.keyword == "additionalProperties"
        ? item?.params.additionalProperty + " nomli qo'shimcha malumot bor"
        : item?.message;

    return error(res, message);
  }
  next();
};

module.exports = expensesValidation;
