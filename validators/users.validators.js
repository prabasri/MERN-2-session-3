// Activity 3.1:   Validating Data

const Joi = require("joi");

const schema = Joi.object()
.keys({
  age: Joi.number().integer().min(0).max(100),
  gender: Joi.string().valid("male", "female")  // valid means valid values which can be included
})
.or("age", "gender");

const getQueryErrors = (incomingData) => {
  const result = schema.validate(incomingData);
  return result.error;
}

module.exports = {getQueryErrors};  // we can import this inside the users.controller.js and use this function. But already there are same codes like this. This folder is just to understand that we can use validators in a separate file.

// Step 10:  Go to 'currencies.controller.js' to do next activity.