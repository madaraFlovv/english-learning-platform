import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { mockProgress } from "../data/mockProgress";
import { completeLessonProgress } from "../services/progressService";
import type { UserProgress } from "../types/learning";

type ProgressContextValue = {
  progress: UserProgress;
  completeLesson: (lessonId: string, score: number) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

type ProgressProviderProps = {
  children: ReactNode;
};

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>(mockProgress);

  const completeLesson = (lessonId: string, score: number) => {
    setProgress((currentProgress) =>
      completeLessonProgress(currentProgress, lessonId, score),
    );
  };

  return (
    <ProgressContext.Provider value={{ progress, completeLesson }}>
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
