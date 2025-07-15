import { promisify } from "util";
import jwt from "jsonwebtoken";

import User from "./../models/userSchema.js";
import { catchAsync } from "../utils/errorHelper.js";
import AppError from "../utils/appError.js";

const authMiddleware = {
  protect: catchAsync(async (req, res, next) => {
    // Take out authorization header and cookies recieved
    const { authorization } = req.headers;

    let token;
    // Check if have authorization header
    if (!authorization) {
      next(new AppError(401, "Unauthorized (No authorization header)"));
    }
    // Check if have token
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }

    if (!token) {
      next(new AppError(401, "Unauthorized (No token)"));
    }

    const decodedUser = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedUser.id).select("+chats");

    if (!user) {
      throw new AppError(401, "Unauthorized (User does not exist)");
    }

    req.user = user;

    next();
  }),
};

export default authMiddleware;
