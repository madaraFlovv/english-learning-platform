import type { ExerciseQuestion } from "../../../types/learning";

export type { ExerciseQuestion } from "../../../types/learning";

export const presentSimpleQuestions: ExerciseQuestion[] = [
  {
    id: "present-simple-1",
    lessonId: "present-simple",
    order: 1,
    type: "multiple-choice",
    question: "She ___ to school every morning.",
    options: ["go", "goes", "going", "is go"],
    correctAnswer: "goes",
    explanation:
      "With he, she and it, we add -s or -es to the verb in Present Simple.",
  },
  {
    id: "present-simple-2",
    lessonId: "present-simple",
    order: 2,
    type: "multiple-choice",
    question: "They ___ football on Sundays.",
    options: ["plays", "playing", "play", "are play"],
    correctAnswer: "play",
    explanation: "With they, we use the base form of the verb without -s.",
  },
  {
    id: "present-simple-3",
    lessonId: "present-simple",
    order: 3,
    type: "multiple-choice",
    question: "My brother ___ coffee.",
    options: ["don't like", "doesn't likes", "doesn't like", "not like"],
    correctAnswer: "doesn't like",
    explanation:
      "In negative sentences with he, she and it, we use doesn't + base verb.",
  },
  {
    id: "present-simple-4",
    lessonId: "present-simple",
    order: 4,
    type: "multiple-choice",
    question: "___ you speak English?",
    options: ["Does", "Do", "Are", "Is"],
    correctAnswer: "Do",
    explanation: "We use Do to form questions with I, you, we and they.",
  },
  {
    id: "present-simple-5",
    lessonId: "present-simple",
    order: 5,
    type: "multiple-choice",
    question: "The sun ___ in the east.",
    options: ["rise", "rising", "rises", "is rise"],
    correctAnswer: "rises",
    explanation:
      "This is a general fact. We use Present Simple, and with the sun (it), the verb takes -s.",
  },
  {
    id: "present-simple-6",
    lessonId: "present-simple",
    order: 6,
    type: "fill-in-the-blanks",
    sentence: "My sister ___ TV every evening.",
    correctAnswer: "watches",
    explanation: "With she, we add -es to watch in Present Simple.",
  },
  {
    id: "present-simple-7",
    lessonId: "present-simple",
    order: 7,
    type: "fill-in-the-blanks",
    sentence: "We ___ English at school.",
    correctAnswer: "study",
    explanation: "With we, we use the base form of the verb.",
  },
  {
    id: "present-simple-8",
    lessonId: "present-simple",
    order: 8,
    type: "fill-in-the-blanks",
    sentence: "He ___ his homework after dinner.",
    correctAnswer: "does",
    explanation: "With he, the verb do changes to does in Present Simple.",
  },
];
