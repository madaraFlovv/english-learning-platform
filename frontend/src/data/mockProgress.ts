import type { UserProgress } from "../types/learning";

export const mockProgress: UserProgress = {
  userId: "mock-user-1",
  currentLevelId: "a1",
  streakDays: 4,
  coins: 0,
  completedLessonsCount: 3,

  lessonProgress: [
    {
      lessonId: "introductions",
      status: "completed",
      bestScore: 100,
    },
    {
      lessonId: "personal-information",
      status: "completed",
      bestScore: 90,
    },
    {
      lessonId: "numbers-and-dates",
      status: "completed",
      bestScore: 100,
    },
    {
      lessonId: "present-simple",
      status: "in-progress",
    },
  ],
};
