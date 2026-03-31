const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateQuiz(topic, age) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an ed-tech content creator. Always respond with valid JSON only. No extra text, no markdown, no backticks.",
      },
      {
        role: "user",
        content: `Create a quiz for the topic "${topic}" for students aged ${age}.
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
      },
    ],
    max_tokens: 1000,
  });

  const raw = response.choices[0].message.content;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  console.log(JSON.stringify(parsed, null, 2));
}

generateQuiz("Photosynthesis", 10);
