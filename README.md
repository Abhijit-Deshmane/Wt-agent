# Meta Cloud WhatsApp API Setup

This project integrates the **Meta Cloud WhatsApp API** with a Node.js backend. It provides the required webhook endpoints for:

- **GET `/webhook`** – Webhook verification (required by Meta).
- **POST `/webhook`** – Receives incoming WhatsApp webhook events such as messages, message status updates, and other notifications.

---

## Features

- ✅ Meta Webhook Verification
- ✅ Receive incoming WhatsApp messages
- ✅ Receive message delivery/read status updates
- ✅ Express.js backend
- ✅ Environment variable configuration
- ✅ Ready for deployment on Vercel, Railway, Render, or any Node.js hosting

---

## Project Structure

```
.
├── app.js
├── routes/
│   └── webhook.js
├── package.json
├── .env
└── README.md
```

---

# Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- A Meta Developer Account
- A Meta App
- A WhatsApp Business Account
- A Phone Number added to the WhatsApp Cloud API
- Permanent Access Token (recommended)
- Verify Token (custom string)

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd <project-name>
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000

VERIFY_TOKEN=your_verify_token

WHATSAPP_ACCESS_TOKEN=your_access_token

PHONE_NUMBER_ID=your_phone_number_id
```

### Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port |
| `VERIFY_TOKEN` | Custom token used during webhook verification |
| `WHATSAPP_ACCESS_TOKEN` | Meta Cloud API access token |
| `PHONE_NUMBER_ID` | WhatsApp Phone Number ID |

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Webhook Routes

## GET `/webhook`

This endpoint is used only once during webhook verification by Meta.

Meta sends the following query parameters:

```
hub.mode
hub.verify_token
hub.challenge
```

If the supplied verify token matches your environment variable, return the challenge.

Example response

```
200 OK

<challenge>
```

Otherwise return

```
403 Forbidden
```

---

## POST `/webhook`

This endpoint listens for webhook events from Meta.

It receives events like:

- Incoming messages
- Delivery status
- Read receipts
- Sent status
- Message reactions
- Other WhatsApp webhook events

Example request body

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "changes": [
        {
          "value": {
            "messages": []
          }
        }
      ]
    }
  ]
}
```

After receiving an event you can:

- Store messages in your database
- Trigger AI agents
- Send automatic replies
- Update your internal dashboard
- Process customer orders

Always return

```http
200 OK
```

to acknowledge the webhook.

---

# Meta Dashboard Configuration

Configure your webhook inside the Meta Developer Dashboard.

Webhook URL

```
https://your-domain.com/webhook
```

Verify Token

```
Same value as VERIFY_TOKEN
```

Subscribe to the required webhook fields, such as:

- messages
- message_status
- message_template_status_update

---

# Testing

You can test the webhook by:

1. Sending a WhatsApp message to your registered phone number.
2. Checking your server logs.
3. Confirming that the POST `/webhook` endpoint receives the event.

---

# Deployment

Deploy the application to any Node.js hosting provider.

Examples:

- Vercel
- Railway
- Render
- AWS EC2
- DigitalOcean
- Fly.io

After deployment:

1. Update the Webhook URL in the Meta Dashboard.
2. Verify the webhook again.
3. Send a test message.

---

# Common Issues

## Verification Failed

- Verify Token does not match.
- Incorrect Webhook URL.
- GET route is not publicly accessible.

---

## No POST Requests Received

Check the following:

- The webhook is successfully verified.
- Your Meta App is in Live mode (if required).
- The correct WhatsApp Business Account is subscribed.
- The required webhook fields are subscribed.
- Your server returns HTTP 200.
- Your server is publicly accessible.

---

## Invalid Access Token

Generate a new access token and update

```
WHATSAPP_ACCESS_TOKEN
```

---

# API Flow

```
User
   │
   ▼
WhatsApp
   │
   ▼
Meta Cloud API
   │
   ▼
POST /webhook
   │
   ▼
Backend
   │
   ├── Store Message
   ├── Process Business Logic
   ├── Update Dashboard
   └── Send Reply (Optional)
```

---

# Tech Stack

- Node.js
- Express.js
- Meta Cloud WhatsApp API
- dotenv

---

# License

This project is licensed under the MIT License.
