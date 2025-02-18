const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
require("ajv-formats")(ajv);
const response = require("../utils/response");

const adminValidation = (req, res, next) => {
  const schema = {
    type: "object",
    properties: {
      fullname: { type: "string", minLength: 2, maxLength: 20 },
      phone: {
        type: "string",
        minLength: 9,
        maxLength: 9,
        pattern: "^[0-9]+$",
      },
      login: {
        type: "string",
        minLength: 6,
        maxLength: 15,
        pattern: "^[a-zA-Z0-9]+$",
      },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 15,
        pattern: "^[a-zA-Z0-9]+$",
      },
    },
    required: ["fullname", "phone", "login", "password"],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullname: "Iltimos, ism kiriting!",
        phone: "Iltimos, telefon raqam kiriting!",
        login: "Iltimos, login kiriting!",
        password: "Iltimos, parol kiriting!",
      },
      properties: {
        fullname: "Iltimos, ism kamida 2 ta belgi kiriting, ",
        phone: "Iltimos, telefon raqam kiriting, format : 998887766 ",
        login: "Iltimos, login kamida 6 ta belgi kiriting, ",
        password: "Iltimos, parol kamida 6 ta belgi kiriting, ",
      },
    },
  };

  const validate = ajv.compile(schema);
  const result = validate(req.body);
  if (!result) return response.error(res, validate.errors[0].message);
  next();
};

module.exports = adminValidation;
