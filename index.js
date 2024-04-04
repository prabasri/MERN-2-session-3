require('dotenv').config();
console.log("Session-3 started");
/*
We learnt about express.
And separated our controller logic from our routes.
We created 3 routes for currency and also 3 for users.

Now imagine if we have 15 such user routes. Suppose one day we wish to disable all the users routes at once. We have to handle them separately. That's why we have express router module to manage our routes in a separate file.
    a)  Allows us to club our routes together.
    b)  Manage API versioning.

  Step 1:  Move all the existing routes in the index.js to routes/currencies.routes.js along with its controller imports.
  Step 2:  Go to currencies.routes.js
  Step 3.1:  Use the routes
             a)  Now import all the routes in index.js
             b)  Now to use these routes, we have a function in the express app object called use() that takes in two parameters
                 1)  route (string).
                 2)  middleware for the route → Here it will be the object we imported.
             Use the routes by typing [app.use('currencies', currencyRoutes)];

  Step 3.2:  Call the routes from postman. Currently it gives us an error and choosing the default route and shows "invalid route". This is because, when it takes the route './currencies' and go inside the file 'currencies.routes.js'. But it don't know which route to take inside that and so it takes the default route '*'. If we use the route "/currencies/currencies", it will work. But it is not pretty. So, remove the currencies in the url endpoint.

  Step 4:  Activity-1
             Update your application to club all the user routes together in a file user.routes.js. Make your app “use” these routes. 
  Step 5:  Go to users.routes.js for other activities.
*/

const express = require('express');
const app = express();
const PORT = 8082;
const currencyRoutes = require('./routes/currencies.routes');
const userRoutes = require('./routes/users.routes');

//  2  // 
// const {getCurrencies, getCurrencyBySymbol} = require('./controllers/currencies.controller');

//  4  //
// const {getUsers, getUserById, searchUsersByQuery} = require('./controllers/users.controller');

//  1  // 

// app.get("/currencies/title", (req, res) => {
//   res.json(data);
// });

// app.get("/currencies", getCurrencies);

// app.get("/currencies/:id", getCurrencyBySymbol);

app.use('/currencies', currencyRoutes);

//  3  //

// app.get("/users", getUsers);  

// app.get("/users/search", searchUsersByQuery); 

// app.get("/users/:uuid", getUserById);

app.use('/users', userRoutes);

app.get('*', (req, res) => {
  console.log("invalid route")
});

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
