import express from "express";
import xml2js from "xml2js";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;

app.post("/message", async (req, res) => {
  if (!req.body || !req.body.Body) {
    return res.status(400).send("Invalid request");
  }

  console.log(req.body.Body);

  let replyMessage;
  if (req.body.Body.toLowerCase() === "hi") {
    replyMessage = "Want to see our catalog?";
  } else if (req.body.Body.toLowerCase() === "hey") {
    replyMessage = "How can I help you?";
  } else {
    replyMessage = "Welcome to CandidPhotos";
  }

  const client = twilio(accountSid, authToken);

  await client.messages
    .create({
      body: replyMessage,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${process.env.NUMBER}`,
    })
    .then((message) => {
      res.set("Content-Type", "application/xml");
      res.send();
    })
    .catch((error) => {
      res.status(500).json({ success: false, msg: error.message });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
