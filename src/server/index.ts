import cors from 'cors';
import { config } from 'dotenv';
import express from "express";
import authRouter from '../routes/auth';
import passwordResetRouter from "../routes/passwordReset";
import userRouter from '../routes/users';
import connectToMongoDB from "./db";

const app = express();

app.use(cors());
app.use(express.json());

config();

connectToMongoDB();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/password-reset", passwordResetRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
