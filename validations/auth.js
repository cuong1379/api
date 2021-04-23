const Joi = require("joi");

const registerValidator = (data) => {
  const rule = Joi.object({
    username: Joi.string().min(5).max(225).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
  });

  return rule.validate(data);
};

module.exports.registerValidator = registerValidator;
