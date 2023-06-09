require("dotenv").config();
const modelName = require("../MODELS/Admin");
const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await modelName.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "You are not authoriz",
      });
    }
    const authToken = user.token;
    if (!authToken) {
      return res.status(400).json({
        message: "Not authorized",
      });
    }
    jwt.verify(authToken, process.env.JWT_TOKEN, (err, payLoad) => {
      if (err) {
        return res.status(401).json({
          message: "Failed to authenticate token",
        });
      } else {
        req.user = payLoad; 
        // console.log(req.user)
        next();
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.isMachant = (req, res, next) => {
  checkUser(req, res, () => {
    if (req.user.isMachant) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
  });
};

exports.isSuperAdmin = (req, res, next) => {
  checkUser(req, res, () => {
    if (req.user.isSuperAdmin) {
      next();
    } else {
      res.status(401).json({
        message: "Sorry, you are not authorized to perform this action.", 
      });
    }
  });
};

exports.isUser = (req, res, next) => {
  checkUser(req, res, () => {
    if (!req.user.isMachant) {
      next();
    } else {
      res.status(401).json({
        message: "Sorry, you are not authorized",
      });
    }
  });
};
  
