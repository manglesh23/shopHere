const jwt = require("jsonwebtoken");

const verifytoken = async (req, res,next) => {
  let token = req.headers["authorization"];
  console.log("Token:-",token)
  token=token.split(' ')[1];
  console.log(token)
  if (!token) return res.status(403).send("Access Denied");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
};

module.exports = { verifytoken };
