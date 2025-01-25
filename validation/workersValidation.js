const Ajv = require("ajv");
const { error } = require("../utils/response");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);

const workersValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      firstname: { type: "string", minLength: 2, maxLength: 20 },
      lastname: { type: "string", minLength: 2, maxLength: 20 },
      phone: { type: "string", minLength: 9, maxLength: 9 },
      address: { type: "string" },
      birthdate: { type: "string", format: "date" },
    },
    required: ["firstname", "lastname", "phone", "address", "birthdate"],
    additionalProperties: false,
    errorMessage: {
      required: {
        firstname: "Iltimos, ism kiriting!",
        lastname: "Iltimos, familiya kiriting!",
        phone: "Iltimos, telefon raqam kiriting!",
        address: "Iltimos, manzil kiriting!",
        birthdate: "Iltimos, tug'ilgan sanani kiriting!",
      },
      properties: {
        firstname: "Iltimos, ism kamida 2 ta belgi kiriting, ",
        lastname: "Iltimos, familiya kamida 2 ta belgi kiriting, ",
        phone: "Iltimos, telefon raqam kamida 9 ta belgi kiriting, ",
        address: "Iltimos, manzil kiriting, ",
        birthdate: "Iltimos, tug'ilgan sanani kiriting, ",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);
  if (!result) return error(res, validate.errors[0].message);
  next();
};

module.exports = workersValidation;
