/* ==========================================
   LEVELS AND ROADMAP
========================================== */

export type CEFRLevelCode = "A1" | "A2" | "B1" | "B2" | "C1";

export type Level = {
  id: string;
  code: CEFRLevelCode;
  title: string;
  description: string;
  order: number;
};

export type Topic = {
  id: string;
  levelId: string;
  title: string;
  description: string;
  order: number;
};

/* ==========================================
   LESSONS
========================================== */

export type LessonContentBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "rule";
      title: string;
      description: string;
    }
  | {
      type: "example";
      english: string;
      translation?: string;
      note?: string;
    };

export type Lesson = {
  id: string;
  topicId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  content: LessonContentBlock[];
};

/* ==========================================
   EXERCISES
========================================== */

export type MultipleChoiceExercise = {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type FillInTheBlanksExercise = {
  type: "fill-in-the-blanks";
  sentence: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
};

export type ExerciseBase = {
  id: string;
  lessonId: string;
  order: number;
};

export type ExerciseQuestion = ExerciseBase &
  (MultipleChoiceExercise | FillInTheBlanksExercise);

export type Exercise = ExerciseQuestion;

/* ==========================================
   USER PROGRESS
========================================== */

export type LessonStatus = "not-started" | "in-progress" | "completed";

export type LessonProgress = {
  lessonId: string;
  status: LessonStatus;
  bestScore?: number;
  completedAt?: string;
};

export type UserProgress = {
  userId: string;
  currentLevelId: string;
  highestVerifiedLevelId: string | null;
  streakDays: number;
  coins: number;
  completedLessonsCount: number;
  lessonProgress: LessonProgress[];
};

/* ==========================================
   USER PROFILE
========================================== */

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

/* ==========================================
   COMPLETE LEARNING DATA
========================================== */

export type LearningData = {
  levels: Level[];
  topics: Topic[];
  lessons: Lesson[];
  exercises: Exercise[];
};