# 🎓 AI Ed-Tech Quiz Generator

An AI-powered tool that instantly generates adaptive quiz games for students — from any topic or custom lesson content.

Built as a white-label SaaS concept for schools and ed-tech platforms.

![Demo](https://img.shields.io/badge/status-live-brightgreen) ![Node](https://img.shields.io/badge/node-18+-blue) ![React](https://img.shields.io/badge/react-19-blue) ![AI](https://img.shields.io/badge/AI-Groq%20LLaMA%203.3-orange)

---

## ✨ Features

- **Topic-based generation** — enter any topic + age group → get a ready quiz instantly
- **Lesson-text generation** — paste any lesson content → AI generates questions from it (RAG-lite)
- **Age-adaptive content** — questions are tailored to the student's age group (6–16)
- **Interactive quiz UI** — click to answer, green/red feedback, explanation shown after each answer
- **Structured JSON API** — clean backend API, easy to integrate into any ed-tech platform

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, TypeScript, Vite, Axios |
| Backend | Node.js, Express.js |
| AI | Groq API (LLaMA 3.3 70B) |
| Deployment | Vercel (frontend) · Railway (backend) |

---

## 📁 Project Structure

```
ai-edtech-generator/
├── backend/
│   ├── server.js        # Express API with 2 endpoints
│   ├── test.js          # Quick API test script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx      # Main app component
│   │   └── App.css      # Styles
│   └── package.json
└── README.md
```

---

## 🚀 API Endpoints

### `POST /generate-quiz`
Generate a quiz from a topic and age group.

**Request:**
```json
{
  "topic": "Photosynthesis",
  "age": 10
}
```

**Response:**
```json
{
  "topic": "Photosynthesis",
  "age": 10,
  "questions": [
    {
      "question": "What is the main function of photosynthesis?",
      "options": ["Make food for humans", "Produce oxygen", "Convert light to energy", "Absorb water"],
      "correct": 2,
      "explanation": "Photosynthesis converts light energy into chemical energy in the form of glucose."
    }
  ]
}
```

---

### `POST /generate-quiz-from-text`
Generate a quiz from custom lesson content (RAG-lite approach).

**Request:**
```json
{
  "text": "The water cycle includes evaporation, condensation and precipitation...",
  "age": 10
}
```

**Response:** Same structure as above, questions grounded in the provided text.

---

## ⚙️ Setup & Run Locally

### Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com)

```bash
node server.js
# Server runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🧠 How It Works

```
User Input (topic + age)
        ↓
Express API receives request
        ↓
Prompt engineered for age-appropriate content
        ↓
Groq LLaMA 3.3 70B generates structured JSON
        ↓
React UI renders interactive quiz
        ↓
Student answers → instant feedback + explanation
```

For the lesson-text endpoint, the content is passed directly as context to the model — a RAG-lite approach that grounds responses in your own curriculum material rather than the model's general training data.

---

## 🗺 Roadmap

- [x] Topic-based quiz generation
- [x] Lesson-text quiz generation (RAG-lite)
- [x] Interactive React frontend
- [ ] Story-based game narrative generation
- [ ] Fine-tuned model on ed-tech curriculum dataset
- [ ] Teacher dashboard
- [ ] White-label school integration
- [ ] COPPA compliant on-device SLM version (Phi-3 / Gemma)

---

## 👨‍💻 Author

**Mohammedhatim Kagazi** — Technical Lead | Full Stack Engineer | Ed-Tech Game Developer

[LinkedIn](https://www.linkedin.com/in/mohammedhatim) · [GitHub](https://github.com/hatim-developer) · [Portfolio](https://my-portfolio-mohammedhatim-ks-projects.vercel.app/)
