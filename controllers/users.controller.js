const { data } = require('../DB/users.json');
/*
Activity: Creating a Joi Schema
    Step 6.1:  The first step in Joi validation is to set a schema for the data object.
    Step 6.2:  Create a schema with the functions in the Joi object.
    Step 6.3:  Create a function which will compare incoming data with the above defined schema. Joi object supports method chaining, where you can call one method on the result of the previous one. Something like
    
    object.function().function().function()...

    Joi has a function called keys() that takes in an object schema. 

    object.keys()
    
    Here you can specify what keys need to be passed through what all checks. Defined age should be a number, specify that number to be an integer and add a range to the age parameter.

    Step 6.4:  Specifying that at least one of the keys should be present

      // For example: At least one of phone or email should be present

      const schema = Joi.object().keys({
        phone: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
      }).or("phone", "email")

      Like this, we must specify that atleast age or gender should be present.
*/
const Joi = require("joi");
const schema = Joi.object().keys({
  age: Joi.number().integer().min(0).max(100),
  gender: Joi.string().valid("male", "female")  // valid means valid values which can be included
}).or("age", "gender");

/*
Step 7:  Create a validator function

  1)  Now to conveniently use this schema to validate our request we will create a helper function called 'getQueryErrors'.
  2)  That function will take in the data as an object and then validate it against the schema we just created.
  3)  The validate() function takes in the data and returns an object.
  4)  The returned object contains an error object(built-in inside Joi) which has a lot of useful information about the data and the error it was subjected to.
*/

const getQueryErrors = (incomingData) => {
  const result = schema.validate(incomingData);
  return result.error;
}

const getUsers = (req, res) => {
  res.json(data);
}

const getUserById = (req, res) => {

  console.log(req.params);
  const {uuid} = req.params;
  const result = data.find((user) => user.login.uuid === uuid);

  if(result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
}
/*
Step 8:  Using the validator function
    Now we can easily use this function in our searchUsersByQuery() controller. If the error is returned then return the error along with a 422 status.

    Now, if we check using postman, the error object returned is like below if the age is NaN:
    {
      "_original": {
          "age": "fem"
      },
      "details": [
          {
            "message": "\"age\" must be a number",
            "path": [
                "age"
            ],
            "type": "number.base",
            "context": {
                "label": "age",
                "value": "fem",
                "key": "age"
            }
          }
      ]
    }
The error message is inbuilt not specified by us.

Step 9:  Create a new folder → validators and inside it add a new file → users.validators.js
*/

const searchUsersByQuery = (req, res) => {

  console.log(req.query);
  const {gender, age} = req.query;

  const error = getQueryErrors({age, gender});
  
  if(error) {
    res.status(422).json(error);
  }

  // Activity 2:

  if(!gender && !age) { // If any one of the params is true, then this code won't get executed.
    res.status(422).json({message: "Missing Search Parameters, search using age and/or gender"});
  }

  if(age) {
    if(!Number(age)) {  
      // For strings, Number() returns a number or NaN. If age is not a number, Number(age) will return NaN and it is a falsy value.
      res.status(422).json({message: "Age parameter should be a number"});
    }
    if(age < 0 || age > 100) {
      res.status(422).json({message: "Age out of bounds. It should be a number between 0 and 100"});
    }
  }

  if(!['female', 'male'].includes(gender)) {
    res.status(422).json({message: "Gender to search can either be 'male' or 'female'"});
  }

  /*  Step 6:
    Phew! So much code for just validating 2 simple parameters. JOI to the rescue.
    Validations using Joi:
        Joi is a validation library that helps us define a schema for our data.
        And validate a set of data against that schema. Do "npm install joi".
  */ 

  if(gender && age) {

    const result = data.filter((user) => user.gender === gender && Number(user.dob.age) >= Number(age));
    res.json(result);

  } else if(gender) {

    const result = data.filter((user) => user.gender === gender);
    res.json(result);

  } else if(age) {

    const result = data.filter((user) => Number(user.dob.age) >= Number(age));
    res.json(result);

  } else {
    res.sendStatus(404);
  }
}

module.exports = {getUsers, getUserById, searchUsersByQuery};
