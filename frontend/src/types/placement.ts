import type { CEFRLevelCode } from "./learning";

export type PlacementQuestionLevel = CEFRLevelCode;

export type PlacementTestQuestion = {
  id: string;
  level: PlacementQuestionLevel;
  prompt: string;
  type: "multiple-choice" | "text-input";
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
};

export type PlacementLevelResult = {
  level: PlacementQuestionLevel;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
};

export type PlacementTestResult = {
  level: PlacementQuestionLevel;
  levelId: string;
  correctAnswers: number;
  totalQuestions: number;
  levelResults: PlacementLevelResult[];
};
