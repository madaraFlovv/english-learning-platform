import type { LessonContentBlock } from "../../../types/learning";

export const lessonContent: Record<string, LessonContentBlock[]> = {
  "present-simple": [
    {
      type: "heading",
      text: "What is Present Simple?",
    },
    {
      type: "paragraph",
      text: "Present Simple is used to talk about habits, routines, facts and things that are generally true. We use it when an action happens regularly or describes a situation that is usually true.",
    },
    {
      type: "example",
      english: "I study English every day.",
      translation: "Я изучаю английский каждый день.",
      note: "A regular action — something that happens every day.",
    },
    {
      type: "rule",
      title: "When do we use Present Simple?",
      description:
        "We use it for daily routines, habits, general facts and permanent situations.",
    },
    {
      type: "example",
      english: "Water boils at 100°C.",
      translation: "Вода кипит при 100°C.",
      note: "A general fact.",
    },
    {
      type: "example",
      english: "She lives in London.",
      translation: "Она живёт в Лондоне.",
      note: "A permanent situation.",
    },
  ],

  "present-simple-affirmative": [
    {
      type: "heading",
      text: "How to build affirmative sentences",
    },
    {
      type: "paragraph",
      text: "Affirmative sentences in Present Simple are formed with a subject followed by the main verb. The verb usually stays in its base form.",
    },
    {
      type: "rule",
      title: "I / You / We / They",
      description: "Use the base form of the verb. Do not add -s or -es.",
    },
    {
      type: "example",
      english: "They play football every weekend.",
      translation: "Они играют в футбол каждые выходные.",
    },
    {
      type: "rule",
      title: "He / She / It",
      description:
        "Add -s or -es to the verb when the subject is he, she or it.",
    },
    {
      type: "example",
      english: "He plays football every weekend.",
      translation: "Он играет в футбол каждые выходные.",
      note: "Play becomes plays because the subject is he.",
    },
    {
      type: "heading",
      text: "More examples",
    },
    {
      type: "example",
      english: "I work in a bank.",
      translation: "Я работаю в банке.",
    },
    {
      type: "example",
      english: "My parents live in Moscow.",
      translation: "Мои родители живут в Москве.",
    },
  ],

  "present-simple-third-person": [
    {
      type: "heading",
      text: "The third-person singular",
    },
    {
      type: "paragraph",
      text: "When we use he, she or it in an affirmative Present Simple sentence, we usually add -s to the main verb. This is called the third-person singular form.",
    },
    {
      type: "rule",
      title: "Most verbs: add -s",
      description: "Work → works, read → reads, play → plays.",
    },
    {
      type: "example",
      english: "She reads books every evening.",
      translation: "Она читает книги каждый вечер.",
    },
    {
      type: "rule",
      title: "Some verbs: add -es",
      description: "Verbs ending in -s, -sh, -ch, -x or -o usually take -es.",
    },
    {
      type: "example",
      english: "He watches TV after school.",
      translation: "Он смотрит телевизор после школы.",
    },
    {
      type: "rule",
      title: "Consonant + y: change y to -ies",
      description:
        "If a verb ends in a consonant followed by -y, change -y to -ies. Study → studies.",
    },
    {
      type: "example",
      english: "She studies English.",
      translation: "Она изучает английский.",
    },
  ],

  "present-simple-adverbs": [
    {
      type: "heading",
      text: "Adverbs of frequency",
    },
    {
      type: "paragraph",
      text: "Adverbs of frequency tell us how often something happens. They are commonly used with Present Simple because this tense describes habits and routines.",
    },
    {
      type: "rule",
      title: "Common adverbs",
      description:
        "Always — всегда; usually — обычно; often — часто; sometimes — иногда; rarely — редко; never — никогда.",
    },
    {
      type: "example",
      english: "I usually wake up at seven.",
      translation: "Я обычно просыпаюсь в семь.",
    },
    {
      type: "rule",
      title: "Position in a sentence",
      description:
        "Adverbs of frequency usually go before the main verb, but after the verb to be.",
    },
    {
      type: "example",
      english: "She often reads before bed.",
      translation: "Она часто читает перед сном.",
      note: "Often comes before the main verb reads.",
    },
    {
      type: "example",
      english: "He is always friendly.",
      translation: "Он всегда дружелюбный.",
      note: "Always comes after the verb is.",
    },
  ],

  "present-simple-practice": [
    {
      type: "heading",
      text: "Review: Present Simple",
    },
    {
      type: "paragraph",
      text: "In this lesson, review the main ideas of Present Simple: when to use it, how to form affirmative sentences and how verbs change with he, she and it.",
    },
    {
      type: "rule",
      title: "Remember the basic structure",
      description:
        "I / You / We / They + base verb. He / She / It + verb with -s or -es.",
    },
    {
      type: "example",
      english: "I play tennis, but my brother plays football.",
      translation: "Я играю в теннис, а мой брат играет в футбол.",
    },
    {
      type: "rule",
      title: "Remember adverbs of frequency",
      description:
        "Use words like always, usually, often, sometimes and never to describe how frequently an action happens.",
    },
    {
      type: "example",
      english: "We sometimes go to the cinema.",
      translation: "Мы иногда ходим в кино.",
    },
  ],
};
