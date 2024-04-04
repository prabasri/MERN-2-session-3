const router = require('express').Router();
const { getUsers, getUserById, searchUsersByQuery } = require('../controllers/users.controller');

router.get("/", getUsers);

router.get("/search", searchUsersByQuery);

router.get("/:uuid", getUserById);

module.exports = router;

/* Step 5:
  What if someone sent a number in place of a string for gender and string in place of number for age ?

  Validating Routes:
    1)  We need to validate the incoming requests before we process them
    2)  This has some obvious advantages
          i)  Prevents polluting our database with junk data values
        ii)  Helps save our processing (and computing) time (by discarding un-processable requests)
    3)  We should apply the validations to as much incoming data as possible.

  Activity 2.1
        We need to protect our search route and also improve the developer experience of people working with our APIs. For that we will add the following validations on our data.
    If there is no age and gender value provided → Return 422, with message “Missing Search Parameters, search using age and/or gender”.

  Activity 2.2
        If Age is present
          1)  But it’s not a number → 422, message “Age parameter should be a number”
          2)  But is < 0 or more than 100 → 422, message “Age out of bounds. It should be a number between 0 and 100”

  Activity 2.3
        If gender is present, but the value is not present in allowed values array ([”female”, “male”]), return 422 with message "Gender to search can either be 'male' or 'female'”

Step 6:  Go to 'users.controller.js' to do other things like joi.

*/