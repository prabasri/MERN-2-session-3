/*
Step 2 - Creating a router
  a)  Express has a constructor function (Router()) to initialize a new Router instance.
  b)  Define the routes using router (like we used to do with app).
  c)  And finally export the router instance.
*/

const router  = require('express').Router();
const {getCurrencies, getCurrencyBySymbol} = require('../controllers/currencies.controller');

router.get("/title", (req, res) => {
  res.send('<h1>Currency Database</h1>');
});

router.get("/", getCurrencies);

router.get("/:id", getCurrencyBySymbol);

module.exports = router;

/*
Export from here
Import in index.js
Register to express
*/