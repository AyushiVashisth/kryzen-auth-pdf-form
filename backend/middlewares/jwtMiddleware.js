const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/User.model");

const jwtMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    // const token = req.header("Authorization");
    console.log("Received token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ _id: decoded.dealerId });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = {
      dealerId: user._id,
      fullName: user.fullName
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = jwtMiddleware;
