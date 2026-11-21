import { levels } from "../data/roadmap";
import type { PlacementTestQuestion, PlacementTestResult, PlacementLevelResult } from "../types/placement";

const normalizeAnswer = (answer: string) => answer.trim().toLowerCase();

export const evaluatePlacementTest = (
  questions: PlacementTestQuestion[],
  answers: Record<string, string>,
): PlacementTestResult => {
  const levelOrder = ["A1", "A2", "B1", "B2", "C1"] as const;
  const levelResults: PlacementLevelResult[] = levelOrder.map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const correctAnswers = levelQuestions.filter((question) => {
      const answer = answers[question.id] ?? "";
      const acceptedAnswers = [question.correctAnswer, ...(question.acceptedAnswers ?? [])];
      return acceptedAnswers.some(
        (accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer),
      );
    }).length;

    return {
      level,
      correctAnswers,
      totalQuestions: levelQuestions.length,
      passed: levelQuestions.length > 0 && correctAnswers >= Math.ceil(levelQuestions.length * 0.75),
    };
  });

  let estimatedLevel = levelOrder[0];

  for (const result of levelResults) {
    if (!result.passed) break;
    estimatedLevel = result.level;
  }

  const matchingLevel = levels.find((level) => level.code === estimatedLevel);

  if (!matchingLevel) {
    throw new Error(`Placement level ${estimatedLevel} is missing from roadmap data.`);
  }

  const correctAnswers = questions.filter((question) => {
    const answer = answers[question.id] ?? "";
    return [question.correctAnswer, ...(question.acceptedAnswers ?? [])].some(
      (accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer),
    );
  }).length;

  return {
    level: estimatedLevel,
    levelId: matchingLevel.id,
    correctAnswers,
    totalQuestions: questions.length,
    levelResults,
  };
};
