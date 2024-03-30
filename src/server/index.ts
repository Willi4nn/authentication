import express from "express";
import { config } from 'dotenv';
import cors from 'cors';
import connectToMongoDB from "./db";
import authRouter from '../routes/auth';
import userRouter from '../routes/users';

const app = express();

app.use(cors());
app.use(express.json());

config();

connectToMongoDB();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
