const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

//Authenticate user
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    //get rid of the bearer part
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  }
  return res.status(401).send({ message: "Token doesn't exist" });
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: "Admin token is not valid" });
};

module.exports = { getToken, isAuth, isAdmin };
