import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { mockProgress } from "../data/mockProgress";
import { getLevels } from "../services/curriculumService";
import { completeLessonProgress } from "../services/progressService";
import type { UserProgress } from "../types/learning";

type ProgressContextValue = {
  progress: UserProgress;
  completeLesson: (lessonId: string, score: number) => void;
  setCurrentLevel: (levelId: string) => void;
  recordVerifiedLevel: (levelId: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

type ProgressProviderProps = {
  children: ReactNode;
};

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);
  const levels = getLevels();

  const setCurrentLevel = (levelId: string) => {
    const requestedLevel = levels.find((level) => level.id === levelId);

    if (!requestedLevel) return;

    setProgress((currentProgress) => {
      const verifiedLevel = levels.find(
        (level) => level.id === currentProgress.highestVerifiedLevelId,
      );
      const maximumAllowedOrder = verifiedLevel?.order ?? levels[0]?.order ?? 1;

      if (requestedLevel.order > maximumAllowedOrder) return currentProgress;

      return {
        ...currentProgress,
        currentLevelId: levelId,
      };
    });
  };

  const recordVerifiedLevel = (levelId: string) => {
    const requestedLevel = levels.find((level) => level.id === levelId);

    if (!requestedLevel) return;

    setProgress((currentProgress) => {
      const currentVerifiedLevel = levels.find(
        (level) => level.id === currentProgress.highestVerifiedLevelId,
      );

      if (currentVerifiedLevel && requestedLevel.order <= currentVerifiedLevel.order) {
        return currentProgress;
      }

      return {
        ...currentProgress,
        highestVerifiedLevelId: levelId,
        currentLevelId: currentVerifiedLevel
          ? currentProgress.currentLevelId
          : levelId,
      };
    });
  };

  const completeLesson = (lessonId: string, score: number) => {
    setProgress((currentProgress) =>
      completeLessonProgress(currentProgress, lessonId, score),
    );
  };

  return (
    <ProgressContext.Provider
      value={{ progress, completeLesson, setCurrentLevel, recordVerifiedLevel }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }

  return context;
};