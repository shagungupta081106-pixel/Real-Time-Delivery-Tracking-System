import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect Routes
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, No Token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    console.log("Logged In User:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

// Role Authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", roles);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};