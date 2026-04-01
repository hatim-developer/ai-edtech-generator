import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:3001";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  topic: string;
  age: number;
  questions: Question[];
}

function App() {
  const [topic, setTopic] = useState("");
  const [age, setAge] = useState("10");
  const [lessonText, setLessonText] = useState("");
  const [mode, setMode] = useState<"topic" | "text">("topic");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState("");

  async function generateQuiz() {
    setLoading(true);
    setQuiz(null);
    setSelected({});
    setError("");

    try {
      const res =
        mode === "topic"
          ? await axios.post(`${API_URL}/generate-quiz`, {
              topic,
              age: parseInt(age),
            })
          : await axios.post(`${API_URL}/generate-quiz-from-text`, {
              text: lessonText,
              age: parseInt(age),
            });

      setQuiz(res.data);
    } catch (err) {
      console.log("Error", err);
      setError("Failed to generate quiz. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(qIndex: number, oIndex: number) {
    if (selected[qIndex] !== undefined) return; // already answered
    setSelected((prev) => ({ ...prev, [qIndex]: oIndex }));
  }

  function getOptionStyle(qIndex: number, oIndex: number, correct: number) {
    if (selected[qIndex] === undefined) return "option";
    if (oIndex === correct) return "option correct";
    if (selected[qIndex] === oIndex) return "option wrong";
    return "option";
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎓 AI Ed-Tech Quiz Generator</h1>
        <p>Generate adaptive quizzes instantly using AI</p>
      </div>

      <div className="card">
        {/* Mode Toggle */}
        <div className="toggle-row">
          <button
            className={mode === "topic" ? "toggle active" : "toggle"}
            onClick={() => setMode("topic")}
          >
            📚 By Topic
          </button>
          <button
            className={mode === "text" ? "toggle active" : "toggle"}
            onClick={() => setMode("text")}
          >
            📄 From Lesson Text
          </button>
        </div>

        {/* Inputs */}
        {mode === "topic" ? (
          <input
            className="input"
            placeholder="Enter topic e.g. Photosynthesis, Solar System"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        ) : (
          <textarea
            className="textarea"
            placeholder="Paste your lesson content here..."
            value={lessonText}
            onChange={(e) => setLessonText(e.target.value)}
            rows={5}
          />
        )}

        <select
          className="input"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((a) => (
            <option key={a} value={a}>
              Age {a}
            </option>
          ))}
        </select>

        <button
          className="generate-btn"
          onClick={generateQuiz}
          disabled={loading || (mode === "topic" ? !topic : !lessonText)}
        >
          {loading ? "⏳ Generating..." : "✨ Generate Quiz"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {/* Quiz Display */}
      {quiz && (
        <div className="quiz">
          <h2>
            📝 {quiz.topic} — Age {quiz.age}
          </h2>
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-card">
              <p className="question-text">
                <span className="q-number">Q{qIndex + 1}.</span> {q.question}
              </p>
              <div className="options">
                {q.options.map((opt, oIndex) => (
                  <button
                    key={oIndex}
                    className={getOptionStyle(qIndex, oIndex, q.correct)}
                    onClick={() => selectAnswer(qIndex, oIndex)}
                  >
                    <span className="opt-label">
                      {["A", "B", "C", "D"][oIndex]}.
                    </span>{" "}
                    {opt}
                  </button>
                ))}
              </div>
              {selected[qIndex] !== undefined && (
                <div className="explanation">💡 {q.explanation}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
