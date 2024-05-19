import express from "express";
import dotenv from "dotenv";
import { replyMessage } from "./controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.post("/message", replyMessage);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
