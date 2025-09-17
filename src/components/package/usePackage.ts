// src/components/package/usePackage.ts
export type Plan = {
  id: "one" | "super6";
  title: string;
  perks: string[];
  bg: string;
  lightText?: boolean;
  recommended?: boolean;
};

export default function usePackage() {
  const UI = {
    // caption pill
    captionBg: "#F0EFF1",
    captionBorder: "#E0DFE3",
    captionText: "#6B6A70",

    // brand accents
    brand: "#984DDD",
    primary: "#826BFB",

    // text
    neutralPrimary: "#242325",
    neutralSecondary: "#47464A",

    // buttons
    btnTextOnPrimary: "#E4F1FE",
    btnTextOnWhite: "#FFFFFF",
  };

  const plans: Plan[] = [
    {
      id: "one",
      title: "1 to 1 Class",
      bg: "#A996FF", // soft purple block
      lightText: true,
      perks: [
        "Personalized Learning Plan",
        "1-to-1 Exclusive Plan",
        "Individual Focus Program",
        "Dedicated Learning Mode",
      ],
    },
    {
      id: "super6",
      title: "Super 6",
      bg: "#FFFFFF",
      recommended: true,
      perks: [
        "Collaborative Learning Plan",
        "Small Group Program",
        "6-Student Focus Batch",
        "Interactive Group Mode",
      ],
    },
  ];

  return { UI, plans };
}
