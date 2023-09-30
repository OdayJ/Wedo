import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { projectRouter } from "./routes/projects.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/api", projectRouter);

mongoose.connect(process.env.DATABASE_URL);
app.listen(process.env.PORT, () =>
  console.log(`Server is Running... on port ${process.env.PORT}`)
);
