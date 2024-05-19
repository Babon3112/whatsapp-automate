import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const replyMessage = async (req, res) => {
  try {
    if (!req.body || !req.body.Body) {
      return res.status(400).send("Invalid request");
    }

    console.log(req.body.Body);

    const receivedMessage = req.body.Body.toLowerCase();
    let replyMessage;

    switch (receivedMessage) {
      case "hi":
        replyMessage = "Want to see our catalog?";
        break;
      case "hey":
        replyMessage = "How can I help you?";
        break;
      default:
        replyMessage = "Welcome to CandidPhotos";
        break;
    }
    await client.messages.create({
      body: replyMessage,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:+91${process.env.NUMBER}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
