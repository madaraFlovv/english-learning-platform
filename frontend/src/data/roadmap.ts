import type {
  CEFRLevelCode,
  Level,
  Topic,
  Lesson,
  LearningData,
} from "../types/learning";

// ==========================================
// LEVELS
// ==========================================

export const levels: Level[] = [
  {
    id: "a1",
    code: "A1",
    title: "Beginner",
    description: "Build your first foundation in English.",
    order: 1,
  },
  {
    id: "a2",
    code: "A2",
    title: "Elementary",
    description: "Expand your vocabulary and everyday communication.",
    order: 2,
  },
  {
    id: "b1",
    code: "B1",
    title: "Intermediate",
    description: "Become more independent and confident in English.",
    order: 3,
  },
  {
    id: "b2",
    code: "B2",
    title: "Upper Intermediate",
    description: "Develop fluency and express complex ideas.",
    order: 4,
  },
  {
    id: "c1",
    code: "C1",
    title: "Advanced",
    description: "Master advanced structures and nuanced communication.",
    order: 5,
  },
];

// ==========================================
// TOPIC DEFINITIONS
// ==========================================

type TopicSeed = {
  id: string;
  levelId: string;
  title: string;
  description: string;
  order: number;
  lessons: {
    id: string;
    title: string;
    description: string;
    estimatedMinutes: number;
  }[];
};

const topicSeeds: TopicSeed[] = [
  // ========================================
  // A1 — BEGINNER
  // ========================================

  {
    id: "a1-getting-started",
    levelId: "a1",
    title: "Getting started",
    description: "Basic vocabulary, greetings and introductions.",
    order: 1,
    lessons: [
      {
        id: "introductions",
        title: "Greetings and introductions",
        description: "Learn how to greet people and introduce yourself.",
        estimatedMinutes: 10,
      },
      {
        id: "personal-information",
        title: "Personal information",
        description: "Talk about your name, age and country.",
        estimatedMinutes: 12,
      },
      {
        id: "numbers-and-dates",
        title: "Numbers and dates",
        description: "Learn numbers, days, months and dates.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "a1-present-simple",
    levelId: "a1",
    title: "Present Simple",
    description: "Daily routines, habits and basic sentence structure.",
    order: 2,
    lessons: [
      {
        id: "present-simple",
        title: "Introduction to Present Simple",
        description: "Learn how to describe habits and daily routines.",
        estimatedMinutes: 15,
      },
      {
        id: "present-simple-affirmative",
        title: "Affirmative sentences",
        description: "Build positive sentences using Present Simple.",
        estimatedMinutes: 12,
      },
      {
        id: "present-simple-third-person",
        title: "He, she and it",
        description: "Understand the -s and -es verb endings.",
        estimatedMinutes: 12,
      },
      {
        id: "present-simple-adverbs",
        title: "Adverbs of frequency",
        description: "Use always, usually, often, sometimes and never.",
        estimatedMinutes: 12,
      },
      {
        id: "present-simple-practice",
        title: "Present Simple practice",
        description: "Review the main rules with exercises.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "a1-questions-negatives",
    levelId: "a1",
    title: "Questions and negatives",
    description: "Learn to ask questions and make negative sentences.",
    order: 3,
    lessons: [
      {
        id: "present-simple-negatives",
        title: "Negative sentences",
        description: "Use don't and doesn't correctly.",
        estimatedMinutes: 12,
      },
      {
        id: "present-simple-questions",
        title: "Asking questions",
        description: "Form questions with do and does.",
        estimatedMinutes: 12,
      },
      {
        id: "question-words",
        title: "Question words",
        description: "Use what, where, when, who and why.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "a1-everyday-vocabulary",
    levelId: "a1",
    title: "Everyday vocabulary",
    description: "Build vocabulary for common everyday situations.",
    order: 4,
    lessons: [
      {
        id: "daily-routines",
        title: "Daily routines",
        description: "Talk about everyday activities.",
        estimatedMinutes: 12,
      },
      {
        id: "family-and-friends",
        title: "Family and friends",
        description: "Describe people and relationships.",
        estimatedMinutes: 12,
      },
      {
        id: "food-and-drinks",
        title: "Food and drinks",
        description: "Learn vocabulary for food and ordering meals.",
        estimatedMinutes: 12,
      },
    ],
  },

  // ========================================
  // A2 — ELEMENTARY
  // ========================================

  {
    id: "a2-past-simple",
    levelId: "a2",
    title: "Past Simple",
    description: "Talk about finished actions and past events.",
    order: 1,
    lessons: [
      {
        id: "past-simple-introduction",
        title: "Introduction to Past Simple",
        description: "Understand when and how to use Past Simple.",
        estimatedMinutes: 15,
      },
      {
        id: "past-simple-regular",
        title: "Regular verbs",
        description: "Learn how to form the past tense with -ed.",
        estimatedMinutes: 12,
      },
      {
        id: "past-simple-irregular",
        title: "Irregular verbs",
        description: "Learn common irregular verb forms.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "a2-future",
    levelId: "a2",
    title: "Future plans",
    description: "Talk about plans, intentions and predictions.",
    order: 2,
    lessons: [
      {
        id: "future-will",
        title: "Future with will",
        description: "Make predictions and spontaneous decisions.",
        estimatedMinutes: 12,
      },
      {
        id: "future-going-to",
        title: "Going to",
        description: "Talk about intentions and future plans.",
        estimatedMinutes: 12,
      },
      {
        id: "future-comparison",
        title: "Will or going to?",
        description: "Understand the difference between both forms.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "a2-nouns-quantifiers",
    levelId: "a2",
    title: "Nouns and quantifiers",
    description: "Describe quantities and talk about objects.",
    order: 3,
    lessons: [
      {
        id: "countable-uncountable",
        title: "Countable and uncountable nouns",
        description: "Understand different types of nouns.",
        estimatedMinutes: 12,
      },
      {
        id: "some-any",
        title: "Some and any",
        description: "Talk about quantities using some and any.",
        estimatedMinutes: 12,
      },
      {
        id: "much-many",
        title: "Much, many and a lot of",
        description: "Describe large and small quantities.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "a2-comparisons",
    levelId: "a2",
    title: "Comparisons",
    description: "Compare people, places and things.",
    order: 4,
    lessons: [
      {
        id: "comparative-adjectives",
        title: "Comparative adjectives",
        description: "Compare two people or objects.",
        estimatedMinutes: 12,
      },
      {
        id: "superlative-adjectives",
        title: "Superlative adjectives",
        description: "Describe the highest or lowest degree.",
        estimatedMinutes: 12,
      },
      {
        id: "as-as",
        title: "As...as comparisons",
        description: "Talk about equal characteristics.",
        estimatedMinutes: 12,
      },
    ],
  },

  // ========================================
  // B1 — INTERMEDIATE
  // ========================================

  {
    id: "b1-present-perfect",
    levelId: "b1",
    title: "Present Perfect",
    description: "Connect past experiences with the present.",
    order: 1,
    lessons: [
      {
        id: "present-perfect-introduction",
        title: "Introduction to Present Perfect",
        description: "Understand the structure and main uses.",
        estimatedMinutes: 15,
      },
      {
        id: "present-perfect-ever-never",
        title: "Ever and never",
        description: "Talk about life experiences.",
        estimatedMinutes: 12,
      },
      {
        id: "present-perfect-for-since",
        title: "For and since",
        description: "Describe how long something has continued.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "b1-past-continuous",
    levelId: "b1",
    title: "Past Continuous",
    description: "Describe actions in progress in the past.",
    order: 2,
    lessons: [
      {
        id: "past-continuous-introduction",
        title: "Introduction to Past Continuous",
        description: "Learn the structure and basic usage.",
        estimatedMinutes: 12,
      },
      {
        id: "past-continuous-interruptions",
        title: "Interrupted actions",
        description: "Combine Past Simple and Past Continuous.",
        estimatedMinutes: 15,
      },
      {
        id: "past-continuous-storytelling",
        title: "Describing past events",
        description: "Use Past Continuous in stories.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "b1-modal-verbs",
    levelId: "b1",
    title: "Modal verbs",
    description: "Express ability, advice, obligation and possibility.",
    order: 3,
    lessons: [
      {
        id: "modal-ability",
        title: "Can and could",
        description: "Talk about ability and possibility.",
        estimatedMinutes: 12,
      },
      {
        id: "modal-obligation",
        title: "Must and have to",
        description: "Express rules and obligations.",
        estimatedMinutes: 12,
      },
      {
        id: "modal-advice",
        title: "Should and ought to",
        description: "Give advice and recommendations.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "b1-conditionals",
    levelId: "b1",
    title: "Conditionals",
    description: "Talk about real situations and possible results.",
    order: 4,
    lessons: [
      {
        id: "zero-conditional",
        title: "Zero Conditional",
        description: "Describe facts and general truths.",
        estimatedMinutes: 12,
      },
      {
        id: "first-conditional",
        title: "First Conditional",
        description: "Talk about possible future situations.",
        estimatedMinutes: 12,
      },
      {
        id: "conditional-practice",
        title: "Conditional practice",
        description: "Review conditional sentence structures.",
        estimatedMinutes: 15,
      },
    ],
  },

  // ========================================
  // B2 — UPPER INTERMEDIATE
  // ========================================

  {
    id: "b2-perfect-tenses",
    levelId: "b2",
    title: "Perfect tenses",
    description: "Master more complex relationships between actions.",
    order: 1,
    lessons: [
      {
        id: "past-perfect",
        title: "Past Perfect",
        description: "Talk about actions completed before another past event.",
        estimatedMinutes: 15,
      },
      {
        id: "present-perfect-continuous",
        title: "Present Perfect Continuous",
        description: "Emphasize duration and ongoing activities.",
        estimatedMinutes: 15,
      },
      {
        id: "perfect-tenses-comparison",
        title: "Perfect tenses comparison",
        description: "Choose the correct perfect tense in context.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "b2-conditionals",
    levelId: "b2",
    title: "Advanced conditionals",
    description: "Discuss hypothetical and unreal situations.",
    order: 2,
    lessons: [
      {
        id: "second-conditional",
        title: "Second Conditional",
        description: "Talk about imaginary present or future situations.",
        estimatedMinutes: 12,
      },
      {
        id: "third-conditional",
        title: "Third Conditional",
        description: "Discuss imaginary situations in the past.",
        estimatedMinutes: 15,
      },
      {
        id: "mixed-conditionals",
        title: "Mixed Conditionals",
        description: "Combine different time references.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "b2-reported-speech",
    levelId: "b2",
    title: "Reported Speech",
    description: "Report what other people have said.",
    order: 3,
    lessons: [
      {
        id: "reported-statements",
        title: "Reported statements",
        description: "Change direct speech into reported speech.",
        estimatedMinutes: 12,
      },
      {
        id: "reported-questions",
        title: "Reported questions",
        description: "Report questions using the correct word order.",
        estimatedMinutes: 12,
      },
      {
        id: "reported-commands",
        title: "Reported commands",
        description: "Report instructions, requests and commands.",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "b2-passive-relative",
    levelId: "b2",
    title: "Passive Voice and relative clauses",
    description: "Build more flexible and complex sentences.",
    order: 4,
    lessons: [
      {
        id: "passive-voice",
        title: "Passive Voice",
        description: "Focus on actions rather than the person performing them.",
        estimatedMinutes: 15,
      },
      {
        id: "defining-relative-clauses",
        title: "Defining relative clauses",
        description: "Identify people and things using relative clauses.",
        estimatedMinutes: 12,
      },
      {
        id: "non-defining-relative-clauses",
        title: "Non-defining relative clauses",
        description: "Add extra information to a sentence.",
        estimatedMinutes: 12,
      },
    ],
  },

  // ========================================
  // C1 — ADVANCED
  // ========================================

  {
    id: "c1-advanced-structures",
    levelId: "c1",
    title: "Advanced grammatical structures",
    description: "Use complex structures with accuracy and flexibility.",
    order: 1,
    lessons: [
      {
        id: "inversion",
        title: "Inversion",
        description: "Use inverted word order for emphasis.",
        estimatedMinutes: 15,
      },
      {
        id: "cleft-sentences",
        title: "Cleft sentences",
        description: "Emphasize specific information in a sentence.",
        estimatedMinutes: 15,
      },
      {
        id: "ellipsis-substitution",
        title: "Ellipsis and substitution",
        description: "Make speech and writing more natural and concise.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "c1-advanced-modals",
    levelId: "c1",
    title: "Advanced modal verbs",
    description: "Express subtle meanings, assumptions and criticism.",
    order: 2,
    lessons: [
      {
        id: "modal-deduction-present",
        title: "Deduction about the present",
        description: "Express certainty and probability.",
        estimatedMinutes: 15,
      },
      {
        id: "modal-deduction-past",
        title: "Deduction about the past",
        description: "Make assumptions about past events.",
        estimatedMinutes: 15,
      },
      {
        id: "modal-perfect-forms",
        title: "Modal perfect forms",
        description: "Use modal verbs to discuss past possibilities.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "c1-nuanced-language",
    levelId: "c1",
    title: "Nuanced language",
    description: "Express ideas precisely and naturally.",
    order: 3,
    lessons: [
      {
        id: "advanced-collocations",
        title: "Advanced collocations",
        description: "Learn natural combinations of words.",
        estimatedMinutes: 15,
      },
      {
        id: "idioms-and-expressions",
        title: "Idioms and expressions",
        description: "Understand common figurative expressions.",
        estimatedMinutes: 15,
      },
      {
        id: "register-and-style",
        title: "Register and style",
        description: "Choose formal and informal language appropriately.",
        estimatedMinutes: 15,
      },
    ],
  },
  {
    id: "c1-academic-english",
    levelId: "c1",
    title: "Academic and professional English",
    description: "Communicate effectively in complex situations.",
    order: 4,
    lessons: [
      {
        id: "academic-writing",
        title: "Academic writing",
        description: "Structure arguments and formal texts.",
        estimatedMinutes: 20,
      },
      {
        id: "argumentation",
        title: "Building arguments",
        description: "Support opinions with clear reasoning.",
        estimatedMinutes: 15,
      },
      {
        id: "advanced-discussion",
        title: "Advanced discussion",
        description: "Discuss abstract and complex topics.",
        estimatedMinutes: 20,
      },
    ],
  },
];

// ==========================================
// CONVERT TOPIC DEFINITIONS INTO DATA
// ==========================================

export const topics: Topic[] = topicSeeds.map((topic) => ({
  id: topic.id,
  levelId: topic.levelId,
  title: topic.title,
  description: topic.description,
  order: topic.order,
}));

// ==========================================
// LESSONS
// ==========================================

export const lessons: Lesson[] = topicSeeds.flatMap((topic) =>
  topic.lessons.map((lesson, index) => ({
    id: lesson.id,
    topicId: topic.id,
    title: lesson.title,
    description: lesson.description,
    order: index + 1,
    estimatedMinutes: lesson.estimatedMinutes,
    content: [],
  })),
);

// ==========================================
// COMPLETE LEARNING DATA
// ==========================================

export const learningData: LearningData = {
  levels,
  topics,
  lessons,
  exercises: [],
};

// ==========================================
// HELPER
// ==========================================

export const getLevelByCode = (code: CEFRLevelCode) =>
  levels.find((level) => level.code === code);
