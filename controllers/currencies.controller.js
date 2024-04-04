
const { data } = require("../DB/currencies.json");
/* Step 10:

  Now, any person from any place can send us requests at our server and gain access to the APIs. But that can spam our server with requests. 
  What if we want to password protect our APIs?

  Step 10:  
    1)  To add Security to our Server, let us define a password for our server - Say “LetMeIn”.
    2)  Now we can restrict the access for our APIs using a function say "verifyAuth(req, res)"".
    3)  This function shall check the headers of the request and if it finds the “Authorization” header
          If the value for this header matches our Password then only we process the request, 
          Else return a status of 403 and {"message": “Unauthorized Request”}
    4)  Use this function to protect the “/currencies” route

  Step 11: We protected our routes, but who will protect our password?
  
          1)  We can use the system’s environment variables to mask and hide sensitive information like API keys or Server Endpoints. Because when we deploy our project we specify them separately in the hosting service.

          2)  We will create a new file named .env and specify the key value pairs there.
                ROUTE_PASSWORD=LetMeIn

          3)  Now we can access all these variables and their values using the global process object in Node.js. This process object has another object env inside it where we can access the variables from.
                "const Password = process.env.ROUTE_PASSWORD";

          4)  We might have to restart our server for the environment variables to load.

          5)  But wait, when we send a request, it still says request in unauthorized :( When we console the password, it is showing undefined. Oops! The Password from Env = undefined ?

          6)  This is because, we have to say Node.js that while processing process.env, see the local environment variable not OS env.

          7)  Reading environment variables
              a)  In development we are not using the “actual” environment variables (which are defined for a system through terminal) but instead loading them from a file .env
              b)  To make this .env file functional we need a package called dotenv -> "npm install dotenv".
              c)  Then at the top of our index.js we just write "require('dotenv').config()".

          Now, we got the correct response data :)
*/

// const PASSWORD = "LetMeIn";

const verifyAuth = (req) => {

  const {authorization} = req.headers; // Go to postman and click headers, then type "authorization" value as "LetMeIn". If the authorization is not equal to the PASSWORD, the it will show "Unauthorized Request".

  if(!authorization) {
    return false;
  }
  if(authorization !== process.env.ROUTE_PASSWORD) {
    return false;
  }
  return true;
}

const getCurrencies = (req, res) => {

  if(!verifyAuth(req)) {
    res.status(403).json({'message': 'Unauthorized Request'});
  }

  console.log(req.query);  
  const { min_value } = req.query;  

  if(min_value) {
    const result = data.filter((currency) => Number(currency.min_size) === Number(min_value));
    res.json(result);
  } else {
    res.json(data);
  }
};

const getCurrencyBySymbol = (req, res) => {

  console.log(req.params);
  const { id } = req.params;
  const result = data.find((currency) => currency.id.toLowerCase() === id.toLowerCase());

  if(result) {
    res.json(result);
  } else {
    res.status(404).send("Invalid symbol");
  }
}

module.exports = { getCurrencies, getCurrencyBySymbol }; 
