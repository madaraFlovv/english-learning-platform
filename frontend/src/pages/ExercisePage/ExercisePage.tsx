import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { presentSimpleQuestions } from "../../data/exercises/lessons/presentSimple";

import "./ExercisePage.css";

const normalizeAnswer = (answer: string) => {
  return answer.trim().toLowerCase();
};

const ExercisePage = () => {
  const { lessonId } = useParams();

  const questions = presentSimpleQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const acceptedAnswers =
    question.type === "fill-in-the-blanks"
      ? [question.correctAnswer, ...(question.acceptedAnswers ?? [])]
      : [question.correctAnswer];

  const isCorrect =
    selectedAnswer !== null &&
    acceptedAnswers.some(
      (answer) => normalizeAnswer(answer) === normalizeAnswer(selectedAnswer),
    );

  const handleCheckAnswer = () => {
    if (!selectedAnswer?.trim() || isAnswered) return;

    setIsAnswered(true);

    if (isCorrect) {
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
            <p>
              {question.type === "multiple-choice"
                ? "Choose the correct answer to complete the sentence."
                : "Type the correct form of the verb."}
            </p>
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

          <h2>
            {question.type === "multiple-choice"
              ? question.question
              : question.sentence}
          </h2>

          {question.type === "multiple-choice" ? (
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
          ) : (
            <div className="exercise-fill-answer">
              <input
                type="text"
                className="exercise-fill-input"
                placeholder="Type your answer..."
                value={selectedAnswer ?? ""}
                onChange={(event) => setSelectedAnswer(event.target.value)}
                disabled={isAnswered}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}

          {isAnswered && (
            <div
              className={`exercise-feedback ${
                isCorrect ? "feedback-correct" : "feedback-incorrect"
              }`}
            >
              <h3>{isCorrect ? "Correct answer!" : "Not quite right"}</h3>

              <p>{question.explanation}</p>

              {!isCorrect && question.type === "fill-in-the-blanks" && (
                <p className="exercise-correct-answer">
                  Correct answer: <strong>{question.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}

          <div className="exercise-actions">
            {!isAnswered ? (
              <button
                className="exercise-primary-button"
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer?.trim()}
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
