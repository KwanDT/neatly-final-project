import authRouter from "./apps/auth.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
<<<<<<< HEAD
import cloudinary from "cloudinary";
import dotenv from "dotenv";
async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
=======
import dotenv from "dotenv";

async function init() {
  dotenv.config();
>>>>>>> ebb4d7de06508d90ad442d76dbcd400da9a08ea4
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.use("/auth", authRouter);
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}
init();
