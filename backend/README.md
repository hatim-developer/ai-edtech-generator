# AI Ed-Tech Quiz Generator

An AI-powered tool that generates adaptive quiz content for students.

## Features

- Generate quizzes from any topic and age group
- Generate quizzes from custom lesson content (RAG-lite)
- Powered by Groq (LLaMA 3.3 70B)

## Tech Stack

- Node.js + Express
- Groq API (LLaMA 3.3 70B)
- React (frontend - coming soon)

## API Endpoints

- `POST /generate-quiz` — topic + age → quiz JSON
- `POST /generate-quiz-from-text` — lesson text + age → quiz JSON

## Setup

```bash
npm install
# add your GROQ_API_KEY to .env
node server.js
```
