require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── helper ──────────────────────────────────────────────
async function askGroq(systemPrompt, userPrompt) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 1500,
  });
  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ── Route 1: Generate quiz from topic + age ──────────────
app.post("/generate-quiz", async (req, res) => {
  const { topic, age } = req.body;

  if (!topic || !age) {
    return res.status(400).json({ error: "topic and age are required" });
  }

  try {
    const result = await askGroq(
      "You are an ed-tech content creator. Always respond with valid JSON only. No extra text, no markdown, no backticks.",
      `Create a quiz for the topic "${topic}" for students aged ${age}.
Return exactly this JSON structure:
{
  "topic": "",
  "age": ${age},
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correct": 0,
      "explanation": ""
    }
  ]
}
Generate 3 questions. correct is the index (0-3) of the right option.`,
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate quiz", details: err.message });
  }
});

// ── Route 2: Generate quiz from custom text (RAG-lite) ───
app.post("/generate-quiz-from-text", async (req, res) => {
  const { text, age } = req.body;

  if (!text || !age) {
    return res.status(400).json({ error: "text and age are required" });
  }

  try {
    const result = await askGroq(
      "You are an ed-tech content creator. Always respond with valid JSON only. No extra text, no markdown, no backticks.",
      `Based on the following lesson content, create a quiz for students aged ${age}.
      
LESSON CONTENT:
"""
${text}
"""

Return exactly this JSON structure:
{
  "topic": "",
  "age": ${age},
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correct": 0,
      "explanation": ""
    }
  ]
}
Generate 3 questions strictly based on the lesson content. correct is the index (0-3) of the right option.`,
    );
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to generate quiz", details: err.message });
  }
});

// ── Health check ─────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Ed-Tech API is running" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
