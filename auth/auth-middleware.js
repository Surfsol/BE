const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
  "aslskek34l4kfnad";

// quickly see what this file exports
module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    //jwt.verify verfies that secret code matches
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
            //token is incorrect
            message: "Invalid Credentials"});
      } else {
        //shows all info on token
        // can get additional info to validate additional middleware, example req.decoded.role
        req.decoded = decoded;

        next();
        //can add additional middleware, for access
        }
    })} else {
        return res.status(401).json({message: "No credentials provided"})
    }
}