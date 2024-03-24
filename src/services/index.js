import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';

import userMiddleware from "../middleware/VerifyUserToken.js";
import AuthRouter from "../routes/Auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use('/auth', AuthRouter);

app.get("/protected", userMiddleware, (req, res) => {
  const { username } = req.user;
  res.send(`This is a Protected Route. Welcome ${username}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
