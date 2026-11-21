import type { LessonProgress, UserProgress } from "../types/learning";

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
    bestScore: Math.max(existingLessonProgress?.bestScore ?? 0, normalizedScore),
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
