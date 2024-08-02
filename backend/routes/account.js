const express = require("express");
const authMiddleware = require("../middleware");
const { User, Account } = require("../db");
const mongoose = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({
    userId: userId,
  });
  res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;
  const sender = await Account.findOne({
    userId: req.userId,
  }).session(session);
  if (sender.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }
  const receiver = await Account.findOne({
    userId: to,
  }).session(session);
  if (!receiver) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid sender account" });
  }
  await Account.findOneAndUpdate(
    { userId: sender.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.findOneAndUpdate(
    { userId: receiver.userId },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  console.log(
    `Amount transfered from ${sender.userId} to ${receiver.userId}: ${amount}`
  );
  res.json({ message: "Transfer successful" });
});

module.exports = accountRouter;
