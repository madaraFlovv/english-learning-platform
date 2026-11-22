import { mockProgress } from "../data/mockProgress";
import { getLevels } from "./curriculumService";
import type { LessonProgress, UserProgress } from "../types/learning";

// Mock adapter. The returned object is copied so consumers cannot mutate the seed data.
export const getProgress = (): UserProgress => ({
  ...mockProgress,
  lessonProgress: mockProgress.lessonProgress.map((item) => ({ ...item })),
});

export const selectCurrentLevelProgress = (
  currentProgress: UserProgress,
  levelId: string,
): UserProgress => {
  const levels = getLevels();
  const requestedLevel = levels.find((level) => level.id === levelId);

  if (!requestedLevel) return currentProgress;

  const verifiedLevel = levels.find(
    (level) => level.id === currentProgress.highestVerifiedLevelId,
  );
  const maximumAllowedOrder = verifiedLevel?.order ?? levels[0]?.order ?? 1;

  if (requestedLevel.order > maximumAllowedOrder) return currentProgress;

  return {
    ...currentProgress,
    currentLevelId: levelId,
  };
};

export const recordVerifiedLevelProgress = (
  currentProgress: UserProgress,
  levelId: string,
): UserProgress => {
  const levels = getLevels();
  const requestedLevel = levels.find((level) => level.id === levelId);

  if (!requestedLevel) return currentProgress;

  const currentVerifiedLevel = levels.find(
    (level) => level.id === currentProgress.highestVerifiedLevelId,
  );

  if (
    currentVerifiedLevel &&
    requestedLevel.order <= currentVerifiedLevel.order
  ) {
    return currentProgress;
  }

  return {
    ...currentProgress,
    highestVerifiedLevelId: levelId,
    currentLevelId: currentVerifiedLevel
      ? currentProgress.currentLevelId
      : levelId,
  };
};

export const completeLessonProgress = (
  currentProgress: UserProgress,
  lessonId: string,
  score: number,
): UserProgress => {
  const normalizedScore = Number.isFinite(score)
    ? Math.min(100, Math.max(0, Math.round(score)))
    : 0;

  const existingLessonProgress = currentProgress.lessonProgress.find(
    (item) => item.lessonId === lessonId,
  );

  const updatedLessonProgress: LessonProgress = {
    lessonId,
    status: "completed",
    bestScore: Math.max(
      existingLessonProgress?.bestScore ?? 0,
      normalizedScore,
    ),
    completedAt: new Date().toISOString(),
  };

  const lessonProgress = existingLessonProgress
    ? currentProgress.lessonProgress.map((item) =>
        item.lessonId === lessonId ? updatedLessonProgress : item,
      )
    : [...currentProgress.lessonProgress, updatedLessonProgress];

  const completedLessonsCount = lessonProgress.filter(
    (item) => item.status === "completed",
  ).length;

  return {
    ...currentProgress,
    lessonProgress,
    completedLessonsCount,
  };
};
