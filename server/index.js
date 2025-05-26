import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import cors from "cors";
import UploadRoute from "./Routes/UploadRoute.js";
import chatRoute from "./Routes/chatRoute.js";
import messageRoute from "./Routes/messageRoute.js"
dotenv.config();

const app = express();
app.use(express.static('public'))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/images',express.static("images"));
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => app.listen(process.env.PORT, console.log("Listening")))
  .catch((error) => console.log(error));
 
  app.use('/auth',AuthRoute);
  app.use('/user',UserRoute);
  app.use('/post',PostRoute);
  app.use('/upload',UploadRoute);
  app.use('/chat',chatRoute);
  app.use('/message',messageRoute);