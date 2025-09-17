export const COLORS = {
  textPrimary: "#242325",
  textSecondary: "#47464A",
  tertiary: "#6B6A70",

  // backgrounds
  blueLite: "#E4F1FE",   // Beginner
  lavender: "#E9D8FF",   // Intermediate
  purple: "#A894FF",     // Advanced
};

export type CourseTier = {
  tier: "Beginner" | "Intermediate" | "Advanced";
  label: string;        // A1 & A2, etc
  description: string;
  bg: string;
  lightText?: boolean;  // Advanced uses light text on purple
};

export const LEVELS: CourseTier[] = [
  {
    tier: "Beginner",
    label: "A1 & A2",
    description:
      "Build basic vocabulary, introduce yourself, shop, travel, and hold simple conversations.",
    bg: COLORS.blueLite,
  },
  {
    tier: "Intermediate",
    label: "B1 & B2",
    description:
      "Speak fluently in everyday situations, express opinions, write letters & emails, and prepare for university/work in European Countries.",
    bg: COLORS.lavender,
  },
  {
    tier: "Advanced",
    label: "C1 & C2",
    description:
      "Master academic & professional spoken German language, give presentations, debate, and write at a near-native level.",
    bg: COLORS.purple,
    lightText: true,
  },
];

export default function useCourseLevel() {
  return { COLORS, items: LEVELS };
}
