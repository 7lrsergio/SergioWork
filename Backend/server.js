import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI from "openai";
import { buildMessages } from "./prompt.js";

const app = express();

app.set("trust proxy", 1); // needed for rate limiting behind a proxy (Render, Railway, etc.)
app.disable("x-powered-by");
app.use(helmet());

// origins allowed to talk to this backend
const allowedOrigins = [
  "https://sergiolopez.work",
  "https://www.sergiolopez.work",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "64kb" }));

const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
  maxRetries: 2,
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

if (process.env.NODE_ENV !== "production") {
  app.get("/env-test", (req, res) => {
    res.json({ hasKey: Boolean(process.env.OPENAI_API_KEY) });
  });
}

app.post("/api/chat", chatLimiter, async (req, res) => {
  let messages;
  try {
    messages = buildMessages(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 450,
      temperature: 0.4,
    });

    const reply = response.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "Empty AI response" });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err?.message);

    if (err?.status === 429) {
      return res.status(429).json({ error: "Rate limited. Try again soon." });
    }

    res.status(500).json({ error: "Something went wrong on the server." });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
