var jwt = require("jsonwebtoken");

const JWT_SECRET = "iNotebook";

fetchuser = (req, res, next) => {
  //get user details

  const token = req.header("authToken");

  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // console.log(req.user.id);

    //Call next function
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
