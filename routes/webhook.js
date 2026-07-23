import express from "express";
import { sendWhatsAppMessage } from "../services/whatsapp.js";

const router = express.Router();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "abhijit";

// GET - Webhook Verification
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Forbidden");
});

// POST - Receive WhatsApp Webhook Events
router.post("/", async (req, res) => {
  try {
    console.log("Webhook event received:", req.body);
    const body = req.body;

    const message =
      body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const phone = message.from;
    const text = message.text?.body;

    console.log(phone);
    console.log(text);

    // Save order to DB here

    await sendWhatsAppMessage(
      phone,
      "✅ Thank you! We have received your order."
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;