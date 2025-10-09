// Messages and configuration for the mobile quiz.

export const QUIZ_LENGTH = 6 as const;

export type QuizOption = {
  /** A stable option identifier such as Q1_O1. */
  id: string;
  /** The text shown on the option button. */
  label: string;
};

export type QuizQuestion = {
  /** A stable question identifier (Q1..Q6). */
  id: `Q${number}`;
  /** The question prompt text. */
  prompt: string;
  /** The list of selectable options for the question. */
  options: QuizOption[];
};

// All quiz questions and their possible answers.
export const quizQuestions: QuizQuestion[] = [
  {
    id: "Q1",
    prompt: "How are you feeling after today?",
    options: [
      { id: "Q1_O1", label: "Overwhelmed" },
      { id: "Q1_O2", label: "Worried" },
      { id: "Q1_O3", label: "Frustrated" },
      { id: "Q1_O4", label: "I’m okay / Not sure" },
    ],
  },
  {
    id: "Q2",
    prompt: "How old is your child?",
    options: [
      // Category 0–2 years. When selected, the midcheck screen is displayed after this question.
      { id: "Q2_O1", label: "0–2 years" },
      { id: "Q2_O2", label: "2–3 years" },
      { id: "Q2_O3", label: "4–6 years" },
      { id: "Q2_O4", label: "Prefer not to say" },
    ],
  },
  {
    id: "Q3",
    prompt: "What has felt most difficult for you lately?",
    options: [
      { id: "Q3_O1", label: "Bedtime / Evening routine" },
      { id: "Q3_O2", label: "Boundaries & tantrums" },
      { id: "Q3_O3", label: "Cooperation / Attention" },
      { id: "Q3_O4", label: "Meals / Rituals" },
    ],
  },
  {
    id: "Q4",
    prompt: "What would help you tonight?",
    options: [
      { id: "Q4_O1", label: "A simple step to try" },
      { id: "Q4_O2", label: "A short explanation" },
      { id: "Q4_O3", label: "A bit of validation" },
      { id: "Q4_O4", label: "A short plan for tomorrow" },
    ],
  },
  {
    id: "Q5",
    prompt: "How often do the hard moments happen?",
    options: [
      { id: "Q5_O1", label: "Rarely" },
      { id: "Q5_O2", label: "Sometimes" },
      { id: "Q5_O3", label: "Often" },
      { id: "Q5_O4", label: "Almost daily" },
    ],
  },
  {
    id: "Q6",
    prompt: "Do you want tips just for your child or for you too?",
    options: [
      { id: "Q6_O1", label: "Just for my child" },
      { id: "Q6_O2", label: "For me too" },
      { id: "Q6_O3", label: "For both" },
      { id: "Q6_O4", label: "I’m not sure" },
    ],
  },
];

// Texts used for the mid-quiz check after question 2.
export const midCheck = {
  heading: "You’re doing great — let’s keep going.",
  subheading: "Each small step brings more clarity.",
  cta: "Continue",
};

// Label helpers for various UI elements.
export const labels = {
  /** Returns the progress label (e.g. Q1 of 6). */
  progress: (index: number) => `Q${index} of ${QUIZ_LENGTH}`,
  /** Label for the back button. */
  back: "Back",
};