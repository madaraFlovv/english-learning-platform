import type { LearningData } from "../types/learning";

import { learningData as roadmapData } from "./roadmap";
import { presentSimpleQuestions } from "./exercises/lessons/presentSimple";

// Combine roadmap structure with exercises from individual lessons.
export const learningData: LearningData = {
  ...roadmapData,
  exercises: presentSimpleQuestions,
};
