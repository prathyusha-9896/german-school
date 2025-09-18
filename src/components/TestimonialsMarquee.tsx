import * as React from "react";

type Card = {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  handle?: string;
};

const DEFAULTS: Card[] = [
  {
    id: "1",
    name: "Riya S.",
    role: "RHG Hospital",
    text:
      "I started from zero and cleared B1 in just 6 months. The teachers are patient and motivating!",
    avatar:
      "https://framerusercontent.com/images/UVKHq11tZnbjw2YQYP8hdL4C0Lw.jpg",
    handle: "@Riya",
  },
  {
    id: "2",
    name: "Ankit M.",
    role: "Product Designer",
    text:
      "Thanks to Online German Skool, I secured a job in Munich after completing B2.",
    avatar: "https://framerusercontent.com/images/zVt9OlIjfYTSElDcAUhMqON4E.jpg",
    handle: "@Ankit",
  },
  {
    id: "3",
    name: "Ajit Khurana",
    role: "Jr. Accountant",
    text:
      "Flexible timings helped me learn while working full-time. Cleared A2 easily!",
    avatar: "https://framerusercontent.com/images/VeynQiuTiVEyWCsEEfVvRxCs.jpg",
    handle: "@Ajit",
  },
  {
    id: "4",
    name: "Sophia Perez",
    role: "Product",
    text:
      "Managing IT projects is demanding, but this template simplifies the process.",
    avatar: "https://framerusercontent.com/images/3YaKnzuVN3Zu7VClOOUnfE6OmY.jpg",
    handle: "@Sophia",
  },
  {
    id: "5",
    name: "Katherine Moss",
    role: "UX Designer",
    text:
      "From a UX perspective, this template is a dream come true. Flows feel effortless.",
    avatar: "https://framerusercontent.com/images/VeynQiuTiVEyWCsEEfVvRxCs.jpg",
    handle: "@Katherine",
  },
  {
    id: "6",
    name: "Olly Schroeder",
    role: "System Administrator",
    text:
      "Clean backend structure and easy server-side configuration. My new default.",
    avatar: "https://framerusercontent.com/images/ELQ1vQOazHaiEknyV2zSCSYDsqA.jpg",
    handle: "@Olly",
  },
];

export default function TestimonialsMarquee({
  cards = DEFAULTS,
  speed = 28, // lower = faster (seconds for a full loop)
}: {
  cards?: Card[];
  speed?: number;
}) {
  // duplicate the array so the loop can cross the seam invisibly
  const loop = React.useMemo(() => [...cards, ...cards], [cards]);

  return (
    <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-24 bg-[#E4F1FE]">
      {/* viewport with mask/fades */}
      <div className="relative overflow-hidden rounded-[20px]"
        style={{
            WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 120px, #000 calc(100% - 120px), transparent 100%)",
            maskImage:
            "linear-gradient(to right, transparent 0, #000 120px, #000 calc(100% - 120px), transparent 100%)",
        }}
      >
        {/* infinite strip */}
        <ul
          className="flex gap-6 z-0 will-change-transform "
          style={{
            // the strip is wider than the viewport and moves left forever
            animation: `marquee ${speed}s linear infinite`,
          }}
        >
          {loop.map((c, idx) => (
            <li
              key={`${c.id}-${idx}`}
              className="h-full shrink-0"
              style={{ width: 320, height: 236 }}
            >
              <article className="relative h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={c.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-white/70 shadow"
                    draggable={false}
                  />
                  <div>
                    <p className="font-medium text-neutral-900">{c.name}</p>
                    <p className="text-sm text-neutral-500">{c.role}</p>
                  </div>
                </div>

                {/* stars line like ref */}
                <p className="mb-3 text-[13px] tracking-[0.16em] text-teal-500">
                  ★★★★★
                </p>

                <p className="text-neutral-700">{c.text}</p>

                {c.handle && (
                  <p className="mt-4 text-sm font-medium text-teal-500">
                    {c.handle}
                  </p>
                )}

                {/* subtle top divider like in ref */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-neutral-200/70" />
              </article>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* because we doubled the list */
        }
      `}</style>
    </div>
  );
}
