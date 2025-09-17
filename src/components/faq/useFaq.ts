export type FaqItem = { id: string; q: string; a: string };

export default function useFaq() {
  const items: FaqItem[] = [
    {
      id: "q1",
      q: "What languages do you offer training in?",
      a: "We currently offer training exclusively in the German language, covering all levels from beginner (A1) to advanced (B2).",
    },
    {
      id: "q2",
      q: "How do your language programs work?",
      a: "Classes run in structured modules with live sessions, guided practice, and regular assessments. You’ll receive a learning plan that matches your goals and schedule.",
    },
    {
      id: "q3",
      q: "Who are your trainers?",
      a: "Our certified German tutors have years of teaching experience and prepare learners for Goethe, TELC, and ÖSD exams using proven methods.",
    },
    {
      id: "q4",
      q: "How can I enroll in a course?",
      a: "Choose your level, fill out a short form, and our team will contact you to confirm timing and start dates. You can also book a free trial class before enrolling.",
    },
  ];

  // UI tokens (aligned with the rest of your site)
  const UI = {
    brand: "#984DDD",
    primary: "#242325",
    secondary: "#47464A",
    tertiary: "#6B6A70",
    divider: "#E0DFE3",
    cardBg: "rgba(240, 241, 245, 0.45)", // subtle translucent neutral
    cardBorder: "#E0DFE3",
    captionBg: "#F0EFF1",
    captionBorder: "#E0DFE3",
    captionText: "#6B6A70",
  };

  return { items, UI };
}
