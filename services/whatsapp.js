const GRAPH_API_URL = "https://graph.facebook.com/v25.0";

export async function sendWhatsAppMessage(to, message) {
  const response = await fetch(
    `${GRAPH_API_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error("Failed to send WhatsApp message");
  }

  return data;
}