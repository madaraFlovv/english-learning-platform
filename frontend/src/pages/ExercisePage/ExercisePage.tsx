import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ExercisePage.css";

const questions = [
  {
    question: "She ___ to school every morning.",
    options: ["go", "goes", "going", "is go"],
    correctAnswer: "goes",
    explanation:
      "With he, she and it, we add -s or -es to the verb in Present Simple.",
  },
  {
    question: "They ___ football on Sundays.",
    options: ["plays", "playing", "play", "are play"],
    correctAnswer: "play",
    explanation: "With they, we use the base form of the verb without -s.",
  },
  {
    question: "My brother ___ coffee.",
    options: ["don't like", "doesn't likes", "doesn't like", "not like"],
    correctAnswer: "doesn't like",
    explanation:
      "In negative sentences with he, she and it, we use doesn't + base verb.",
  },
  {
    question: "___ you speak English?",
    options: ["Does", "Do", "Are", "Is"],
    correctAnswer: "Do",
    explanation: "We use Do to form questions with I, you, we and they.",
  },
  {
    question: "The sun ___ in the east.",
    options: ["rise", "rising", "rises", "is rise"],
    correctAnswer: "rises",
    explanation:
      "This is a general fact. We use Present Simple, and with the sun (it), the verb takes -s.",
  },
];

const ExercisePage = () => {
  const { lessonId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    setIsAnswered(true);

    if (selectedAnswer === question.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setIsFinished(true);
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (isFinished) {
    return (
      <div className="exercise-page">
        <div className="exercise-result">
          <span className="section-eyebrow">LESSON COMPLETED</span>

          <div className="result-score">
            {score}
            <span> / {questions.length}</span>
          </div>

          <h1>Practice completed!</h1>

          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>

          <div className="result-progress">
            <div
              className="result-progress-fill"
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>

          <Link to="/" className="exercise-primary-button">
            Back to roadmap
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-page">
      <Link to={`/lesson/${lessonId}`} className="exercise-back-link">
        ← Back to lesson
      </Link>

      <div className="exercise-container">
        <header className="exercise-header">
          <div>
            <span className="section-eyebrow">GRAMMAR PRACTICE</span>
            <h1>Present Simple</h1>
            <p>Choose the correct answer to complete the sentence.</p>
          </div>

          <div className="exercise-counter">
            {String(currentQuestion + 1).padStart(2, "0")}
            <span> / {String(questions.length).padStart(2, "0")}</span>
          </div>
        </header>

        <div className="exercise-progress">
          <div
            className="exercise-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <main className="exercise-card">
          <span className="section-eyebrow">
            QUESTION {currentQuestion + 1}
          </span>

          <h2>{question.question}</h2>

          <div className="exercise-options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correctAnswer;

              let optionClass = "exercise-option";

              if (isSelected) optionClass += " is-selected";
              if (isAnswered && isCorrectOption) {
                optionClass += " is-correct";
              }
              if (isAnswered && isSelected && !isCorrect) {
                optionClass += " is-incorrect";
              }

              return (
                <button
                  key={option}
                  className={optionClass}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={isAnswered}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  {isAnswered && isCorrectOption && (
                    <span className="option-status">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div
              className={`exercise-feedback ${
                isCorrect ? "feedback-correct" : "feedback-incorrect"
              }`}
            >
              <h3>{isCorrect ? "Correct answer!" : "Not quite right"}</h3>
              <p>{question.explanation}</p>
            </div>
          )}

          <div className="exercise-actions">
            {!isAnswered ? (
              <button
                className="exercise-primary-button"
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
              >
                Check answer
                <span>→</span>
              </button>
            ) : (
              <button
                className="exercise-primary-button"
                onClick={handleNextQuestion}
              >
                {currentQuestion === questions.length - 1
                  ? "See results"
                  : "Next question"}
                <span>→</span>
              </button>
            )}
          </div>
        </main>

        <div className="exercise-footer">
          <span>Take your time. Learning is about understanding.</span>
          <span>Present Simple · A1</span>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
