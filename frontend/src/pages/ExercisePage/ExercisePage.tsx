import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getExercisesByLesson, getLevelById, getLessonById, getTopicById } from "../../services/curriculumService";
import { useProgress } from "../../context/ProgressContext";
import { isLevelUnlocked } from "../../services/levelAccessService";

import styles from "./ExercisePage.module.css";

const normalizeAnswer = (answer: string) => {
  return answer.trim().toLowerCase();
};

const ExercisePage = () => {
  const { lessonId } = useParams();
  const { completeLesson, progress: userProgress } = useProgress();

  const lesson = lessonId ? getLessonById(lessonId) : undefined;

  const questions = lessonId ? getExercisesByLesson(lessonId) : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Reset exercise state when the user opens another lesson.
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className={styles["exercise-page"]}>
        <div className={styles["exercise-result"]}>
          <span className={styles["section-eyebrow"]}>ERROR</span>
          <h1>Lesson not found</h1>
          <p>We couldn't find the lesson you're looking for.</p>

          <Link to="/" className={styles["exercise-primary-button"]}>
            Back to roadmap
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  const lessonTopic = getTopicById(lesson.topicId);
  const lessonLevel = lessonTopic
    ? getLevelById(lessonTopic.levelId)
    : undefined;

  if (lessonLevel && !isLevelUnlocked(lessonLevel.id, userProgress.highestVerifiedLevelId)) {
    return (
      <div className={styles["exercise-page"]}>
        <div className={styles["exercise-result"]}>
          <span className={styles["section-eyebrow"]}>LEVEL LOCKED</span>
          <h1>This lesson is not unlocked yet</h1>
          <p>Complete the placement test to access {lessonLevel.code} lessons.</p>
          <Link to="/placement-test" className={styles["exercise-primary-button"]}>
            Take placement test
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className={styles["exercise-page"]}>
        <Link to={`/lesson/${lesson.id}`} className={styles["exercise-back-link"]}>
          ← Back to lesson
        </Link>

        <div className={styles["exercise-result"]}>
          <span className={styles["section-eyebrow"]}>PRACTICE</span>
          <h1>Exercises coming soon</h1>
          <p>
            Exercises for "{lesson.title}" haven't been added yet. Check back
            later.
          </p>

          <Link to={`/lesson/${lesson.id}`} className={styles["exercise-primary-button"]}>
            Back to lesson
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={styles["exercise-page"]}>
        <div className={styles["exercise-result"]}>
          <span className={styles["section-eyebrow"]}>LESSON COMPLETED</span>

          <div className={styles["result-score"]}>
            {score}
            <span> / {questions.length}</span>
          </div>

          <h1>Practice completed!</h1>

          <p>
            You answered {score} out of {questions.length} questions correctly.
          </p>

          <div className={styles["result-progress"]}>
            <div
              className={styles["result-progress-fill"]}
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>

          <Link to="/" className={styles["exercise-primary-button"]}>
            Back to roadmap
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className={styles["exercise-result"]}>
        <h1>Something went wrong</h1>
        <p>We couldn't load this question.</p>
        <Link to={`/lesson/${lesson.id}`} className={styles["exercise-primary-button"]}>
          Back to lesson
          <span>→</span>
        </Link>
      </div>
    );
  }

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
      const finalScore = Math.round((score / questions.length) * 100);
      completeLesson(lesson.id, finalScore);
      setIsFinished(true);
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className={styles["exercise-page"]}>
      <Link to={`/lesson/${lesson.id}`} className={styles["exercise-back-link"]}>
        ← Back to lesson
      </Link>

      <div className={styles["exercise-container"]}>
        <header className={styles["exercise-header"]}>
          <div>
            <span className={styles["section-eyebrow"]}>GRAMMAR PRACTICE</span>
            <h1>{lesson.title}</h1>
            <p>
              {question.type === "multiple-choice"
                ? "Choose the correct answer to complete the sentence."
                : "Type the correct form of the verb."}
            </p>
          </div>

          <div className={styles["exercise-counter"]}>
            {String(currentQuestion + 1).padStart(2, "0")}
            <span> / {String(questions.length).padStart(2, "0")}</span>
          </div>
        </header>

        <div className={styles["exercise-progress"]}>
          <div
            className={styles["exercise-progress-fill"]}
            style={{ width: `${progress}%` }}
          />
        </div>

        <main className={styles["exercise-card"]}>
          <span className={styles["section-eyebrow"]}>
            QUESTION {currentQuestion + 1}
          </span>

          <h2>
            {question.type === "multiple-choice"
              ? question.question
              : question.sentence}
          </h2>

          {question.type === "multiple-choice" ? (
            <div className={styles["exercise-options"]}>
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === question.correctAnswer;

                const optionClass = [
                  styles["exercise-option"],
                  isSelected && styles["is-selected"],
                  isAnswered && isCorrectOption && styles["is-correct"],
                  isAnswered && isSelected && !isCorrect && styles["is-incorrect"],
                ].filter(Boolean).join(" ");

                return (
                  <button
                    key={option}
                    className={optionClass}
                    onClick={() => setSelectedAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span className={styles["option-letter"]}>
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>

                    {isAnswered && isCorrectOption && (
                      <span className={styles["option-status"]}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={styles["exercise-fill-answer"]}>
              <input
                type="text"
                className={styles["exercise-fill-input"]}
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
              className={`${styles["exercise-feedback"]} ${
                isCorrect ? styles["feedback-correct"] : styles["feedback-incorrect"]
              }`}
            >
              <h3>{isCorrect ? "Correct answer!" : "Not quite right"}</h3>

              <p>{question.explanation}</p>

              {!isCorrect && question.type === "fill-in-the-blanks" && (
                <p className={styles["exercise-correct-answer"]}>
                  Correct answer: <strong>{question.correctAnswer}</strong>
                </p>
              )}
            </div>
          )}

          <div className={styles["exercise-actions"]}>
            {!isAnswered ? (
              <button
                className={styles["exercise-primary-button"]}
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer?.trim()}
              >
                Check answer
                <span>→</span>
              </button>
            ) : (
              <button
                className={styles["exercise-primary-button"]}
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

        <div className={styles["exercise-footer"]}>
          <span>Take your time. Learning is about understanding.</span>
          <span>{lesson.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
