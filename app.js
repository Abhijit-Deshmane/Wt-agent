import express from "express";
import bodyParser from "body-parser";
import { sendWhatsAppMessage } from "./services/whatsapp.js";


import webhookRouter from "./routes/webhook.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/webhook", webhookRouter);
// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the backend application." });
// });

// app.post("/", (req, res) => {
//     console.log("Received data:", req.body);
//     res.json({ message: "Data received successfully." });
// });


// GET - Webhook Verification
app.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
    console.log("Webhook verification request received:", req.query);
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.status(403).send("Forbidden");
});

// // POST - Receive WhatsApp Webhook Events
// app.post("/", async (req, res) => {
//   try {
//     console.log("Webhook event received:", req.body);
//     const body = req.body;

//     const message =
//       body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

//     if (!message) {
//       return res.sendStatus(200);
//     }

//     const phone = message.from;
//     const text = message.text?.body;

//     console.log(phone);
//     console.log(text);

//     // Save order to DB here

//     await sendWhatsAppMessage(
//       phone,
//       "✅ Thank you! We have received your order."
//     );

//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });

app.post("/", async (req, res) => {

    console.log("Webhook event received:", req.body);
    const body = req.body;
    
});

export default app; 
