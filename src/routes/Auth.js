import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/User.js";
const AuthRouter = Router();

// Signup route
AuthRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Novo usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
AuthRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default AuthRouter;