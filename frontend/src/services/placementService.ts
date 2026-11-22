import { getLevels } from "./curriculumService";
import type {
  PlacementLevelResult,
  PlacementTestQuestion,
  PlacementTestResult,
} from "../types/placement";

const levelOrder = ["A1", "A2", "B1", "B2", "C1"] as const;

const normalizeAnswer = (answer: string) => answer.trim().toLowerCase();

export const evaluatePlacementTest = (
  questions: PlacementTestQuestion[],
  answers: Record<string, string>,
): PlacementTestResult => {
  if (questions.length === 0) {
    throw new Error("Cannot evaluate a placement test without questions.");
  }

  const missingLevel = levelOrder.find(
    (level) => !questions.some((question) => question.level === level),
  );

  if (missingLevel) {
    throw new Error(`Placement test is missing questions for ${missingLevel}.`);
  }

  const levelResults: PlacementLevelResult[] = levelOrder.map((level) => {
    const levelQuestions = questions.filter(
      (question) => question.level === level,
    );

    const correctAnswers = levelQuestions.filter((question) => {
      const answer = answers[question.id] ?? "";
      const acceptedAnswers = [
        question.correctAnswer,
        ...(question.acceptedAnswers ?? []),
      ];

      return acceptedAnswers.some(
        (accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer),
      );
    }).length;

    return {
      level,
      correctAnswers,
      totalQuestions: levelQuestions.length,
      passed:
        correctAnswers >= Math.ceil(levelQuestions.length * 0.75),
    };
  });

  let estimatedLevel = levelOrder[0];

  for (const result of levelResults) {
    if (!result.passed) break;
    estimatedLevel = result.level;
  }

  const matchingLevel = getLevels().find(
    (level) => level.code === estimatedLevel,
  );

  if (!matchingLevel) {
    throw new Error(
      `Placement level ${estimatedLevel} is missing from curriculum data.`,
    );
  }

  const correctAnswers = questions.filter((question) => {
    const answer = answers[question.id] ?? "";

    return [
      question.correctAnswer,
      ...(question.acceptedAnswers ?? []),
    ].some((accepted) => normalizeAnswer(accepted) === normalizeAnswer(answer));
  }).length;

  return {
    level: estimatedLevel,
    levelId: matchingLevel.id,
    correctAnswers,
    totalQuestions: questions.length,
    levelResults,
  };
};
