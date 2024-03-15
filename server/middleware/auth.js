import jwt from "jsonwebtoken";
import ENV from "../config.js";

export async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log("I am here");
    res.status(401).json({ error: "Authentication failed!" });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}