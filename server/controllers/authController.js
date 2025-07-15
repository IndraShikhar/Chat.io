import jwt from "jsonwebtoken";
import promisify from "util";

import User from "../models/userSchema.js";
import AppError from "../utils/appError.js";
import { createAndSendTokenCookie } from "../utils/authHelper.js";
import { catchAsync } from "../utils/errorHelper.js";

const authController = {
  register: catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    // const db = await getDB("test");

    // const newUser = await db.collection("users").insertOne({
    //   username,
    //   email,
    //   password,
    // });

    const newUser = await User.create({
      username,
      email,
      password,
    });

    createAndSendTokenCookie(newUser, res);

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      user: newUser,
      token,
    });
  }),

  login: catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    // if (!user || !(await user.correctPassword(password, user.password))) {
    if (!user || password !== user.password) {
      return next(new AppError(401, "Incorrect username or password"));
    }

    const token = createAndSendTokenCookie(user, res);

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user,
      token,
    });
  }),
};

export default authController;
