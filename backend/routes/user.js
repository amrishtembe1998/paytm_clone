const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");

const userRouter = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signingBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const patchBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Email already taken / Incorrect inputs" });
  }
  try {
    const { username, password, firstName, lastName } = req.body;
    const alreadyUser = await User.findOne({ username });
    if (alreadyUser) {
      console.log("Already User");
      return res
        .status(411)
        .json({ message: "Email already taken / Incorrect inputs" });
    }
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    return res.json({
      message: `Something wrong while interacting with database: ${error}`,
    });
  }
});

userRouter.post("/signin", authMiddleware, async (req, res) => {
  const { success } = signingBody.safeParse(req.body);
  if (!success) {
    return res
      .status(411)
      .json({ message: "Enter valid Username and Password" });
  }
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username, password });
    if (userExist) {
      const token = jwt.sign(JSON.stringify(userExist._id), JWT_SECRET);
      return res.status(200).json({ token });
    } else {
      return res.status(404).json({
        message: "User does not exist with this username and password",
      });
    }
  } catch (error) {
    return res.json({
      message: `Something wrong while interacting with database: ${error}`,
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = patchBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: "Wrong user input" });
  }
  try {
    const patchResponse = await User.findByIdAndUpdate(
      JSON.parse(req.userId),
      req.body
    );
    console.log("Patch Response: ", patchResponse);
    return res.status(200).json({ message: "User information updated" });
  } catch (error) {
    return res
      .status(411)
      .json({ message: `Error while updating information: ${error}` });
  }
});

userRouter.get("/info", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  return !user
    ? res.status(404).json({ message: "User does not exist with specified ID" })
    : res.status(200).json(user);
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });
  return !users
    ? res.status(404).json({ message: "User does not exist" })
    : res.json({
        user: users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          _id: user._id,
        })),
      });
});

module.exports = userRouter;
