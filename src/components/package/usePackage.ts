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
      title: "Regular Programme",
      bg: "#A996FF", // soft purple block
      lightText: true,
      perks: [
        "1 Hour Daily",
        "Steady Pace",
        "Flexible Schedule",
        "Balanced Progress",
      ],
    },
    {
      id: "super6",
      title: "Super-Intensive Programme",
      bg: "#FFFFFF",
      recommended: true,
      perks: [
        "2+ Hours Daily",
        "Exam Ready",
        "Fastest Progress",
        "Accelerated Learning",
      ],
    },
  ];

  return { UI, plans };
}
