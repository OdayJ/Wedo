import express from "express";
import { User } from "../models/Users.js";
import bcrypt from "bcryptjs";

const router = express.Router();

//Sign up
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(-1);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get user
router.get("/getUser", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/getUserById", async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as userRouter };
