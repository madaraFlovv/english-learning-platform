import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  completeLessonProgress,
  getProgress,
  recordVerifiedLevelProgress,
  selectCurrentLevelProgress,
} from "../services/progressService";
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
  const [progress, setProgress] = useState<UserProgress>(getProgress);

  const setCurrentLevel = (levelId: string) => {
    setProgress((currentProgress) =>
      selectCurrentLevelProgress(currentProgress, levelId),
    );
  };

  const recordVerifiedLevel = (levelId: string) => {
    setProgress((currentProgress) =>
      recordVerifiedLevelProgress(currentProgress, levelId),
    );
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
