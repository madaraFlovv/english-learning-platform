import { learningData } from "../data/learningData";
import type { LearningData, Level, Lesson, Topic } from "../types/learning";

// Mock implementation of the curriculum data source.
// Pages use this service instead of importing static data files directly.
// Replace this implementation with API-backed methods when the backend exists.
export const getLearningData = (): LearningData => learningData;

export const getLevels = (): Level[] => learningData.levels;

export const getLevelById = (levelId: string): Level | undefined =>
  learningData.levels.find((level) => level.id === levelId);

export const getTopicById = (topicId: string): Topic | undefined =>
  learningData.topics.find((topic) => topic.id === topicId);

export const getLessonById = (lessonId: string): Lesson | undefined =>
  learningData.lessons.find((lesson) => lesson.id === lessonId);

export const getTopicsByLevel = (levelId: string): Topic[] =>
  learningData.topics
    .filter((topic) => topic.levelId === levelId)
    .sort((first, second) => first.order - second.order);

export const getLessonsByTopic = (topicId: string): Lesson[] =>
  learningData.lessons
    .filter((lesson) => lesson.topicId === topicId)
    .sort((first, second) => first.order - second.order);

export const getExercisesByLesson = (lessonId: string) =>
  learningData.exercises
    .filter((exercise) => exercise.lessonId === lessonId)
    .sort((first, second) => first.order - second.order);
