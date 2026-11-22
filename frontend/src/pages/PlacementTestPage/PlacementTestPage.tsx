import { useState } from "react";
import { Link } from "react-router-dom";

import { placementQuestions } from "../../data/placementQuestions";
import { evaluatePlacementTest } from "../../services/placementService";
import { useProgress } from "../../context/ProgressContext";
import type { PlacementTestResult } from "../../types/placement";

import styles from "./PlacementTestPage.module.css";

const PlacementTestPage = () => {
  const { recordVerifiedLevel } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<PlacementTestResult | null>(null);

  const currentQuestion = placementQuestions[currentIndex];

  if (!currentQuestion) {
    return (
      <section className={styles["placement-page"]}>
        <h1>Test questions are unavailable</h1>
        <Link to="/">Back to roadmap</Link>
      </section>
    );
  }

  const selectedAnswer = answers[currentQuestion.id] ?? "";
  const progress = ((currentIndex + 1) / placementQuestions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (!selectedAnswer.trim()) return;

    if (currentIndex === placementQuestions.length - 1) {
      const testResult = evaluatePlacementTest(placementQuestions, answers);
      recordVerifiedLevel(testResult.levelId);
      setResult(testResult);
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <div className={styles["placement-page"]}>
        <section className={styles["placement-result"]}>
          <span className={styles["placement-eyebrow"]}>YOUR PLACEMENT RESULT</span>
          <div className={styles["result-level"]}>{result.level}</div>
          <h1>Your estimated English level</h1>
          <p>
            Based on this short grammar and vocabulary check, Englishly recommends
            starting at {result.level}. This is an initial estimate, not an official
            CEFR certificate.
          </p>
          <div className={styles["result-summary"]}>
            <strong>{result.correctAnswers} / {result.totalQuestions}</strong>
            <span>correct answers overall</span>
          </div>
          <div className={styles["level-breakdown"]}>
            {result.levelResults.map((levelResult) => (
              <div className={styles["level-row"]} key={levelResult.level}>
                <span>{levelResult.level}</span>
                <span>{levelResult.correctAnswers} / {levelResult.totalQuestions}</span>
                <span className={levelResult.passed ? styles["passed"] : styles["not-passed"]}>
                  {levelResult.passed ? "Passed" : "Not passed"}
                </span>
              </div>
            ))}
          </div>
          <div className={styles["result-actions"]}>
            <Link to="/" className={styles["placement-button"]}>Go to my roadmap <span>→</span></Link>
            <button type="button" className={styles["secondary-button"]} onClick={handleRestart}>Retake test</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles["placement-page"]}>
      <header className={styles["placement-header"]}>
        <Link to="/" className={styles["back-link"]}>← Back to roadmap</Link>
        <span className={styles["placement-eyebrow"]}>ENGLISHLY · LEVEL CHECK</span>
        <h1>Find your English level</h1>
        <p>Answer 20 questions. The test gradually moves from beginner to advanced English.</p>
        <div className={styles["progress-label"]}>
          <span>Question {currentIndex + 1} of {placementQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className={styles["progress-track"]}>
          <div className={styles["progress-fill"]} style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className={styles["question-card"]}>
        <div className={styles["question-meta"]}>
          <span>{currentQuestion.level} level</span>
          <span>{currentQuestion.type === "multiple-choice" ? "Choose one answer" : "Write your answer"}</span>
        </div>
        <h2>{currentQuestion.prompt}</h2>

        {currentQuestion.type === "multiple-choice" ? (
          <div className={styles["options-list"]}>
            {(currentQuestion.options ?? []).map((option, index) => (
              <button
                type="button"
                key={option}
                className={`${styles["answer-option"]} ${selectedAnswer === option ? styles["selected"] : ""}`}
                onClick={() => handleAnswer(option)}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            className={styles["answer-input"]}
            type="text"
            value={selectedAnswer}
            onChange={(event) => handleAnswer(event.target.value)}
            placeholder="Type your answer..."
            autoComplete="off"
          />
        )}

        <div className={styles["question-footer"]}>
          <span>Take your time. You can review your result at the end.</span>
          <button type="button" className={styles["placement-button"]} onClick={handleNext} disabled={!selectedAnswer.trim()}>
            {currentIndex === placementQuestions.length - 1 ? "Finish test" : "Next question"}
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default PlacementTestPage;