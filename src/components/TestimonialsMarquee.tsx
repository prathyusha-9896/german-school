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
      "“Thanks to Online German Skool, I secured a job in Munich after completing B2.”",
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
    name: "Riya S.",
    role: "RHG Hospital",
    text:
      "I started from zero and cleared B1 in just 6 months. The teachers are patient and motivating!",
    avatar:
      "https://framerusercontent.com/images/UVKHq11tZnbjw2YQYP8hdL4C0Lw.jpg",
    handle: "@Riya",
  },
  {
    id: "5",
    name: "Ankit M.",
    role: "Product Designer",
    text:
      "“Thanks to Online German Skool, I secured a job in Munich after completing B2.”",
    avatar: "https://framerusercontent.com/images/zVt9OlIjfYTSElDcAUhMqON4E.jpg",
    handle: "@Ankit",
  },
  {
    id: "6",
    name: "Ajit Khurana",
    role: "Jr. Accountant",
    text:
      "Flexible timings helped me learn while working full-time. Cleared A2 easily!",
    avatar: "https://framerusercontent.com/images/VeynQiuTiVEyWCsEEfVvRxCs.jpg",
    handle: "@Ajit",
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
    <div className="relative mx-auto w-full max-w-[1600px] px-0 md:pb-24 pb-10 bg-[#E4F1FE]">
      {/* viewport with mask/fades */}
      <div className="relative overflow-hidden [--fade:0px] md:[--fade:120px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, #000 var(--fade), #000 calc(100% - var(--fade)), transparent 100%)",
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
                <div className="mb-4 flex items-center gap-3 border-[#D1D0D6] border-b-[1px] pb-3 ">
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
                <div className="pb-6">
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0251 8.33329L10.0001 1.66663L7.97508 8.33329H1.66675L6.81675 12.0083L4.85841 18.3333L10.0001 14.425L15.1501 18.3333L13.1917 12.0083L18.3334 8.33329H12.0251Z" fill="#C2C100"/>
                  <path d="M32.0251 8.33329L30.0001 1.66663L27.9751 8.33329H21.6667L26.8167 12.0083L24.8584 18.3333L30.0001 14.425L35.1501 18.3333L33.1917 12.0083L38.3334 8.33329H32.0251Z" fill="#C2C100"/>
                  <path d="M52.0251 8.33329L50.0001 1.66663L47.9751 8.33329H41.6667L46.8167 12.0083L44.8584 18.3333L50.0001 14.425L55.1501 18.3333L53.1917 12.0083L58.3334 8.33329H52.0251Z" fill="#C2C100"/>
                  <path d="M72.0251 8.33329L70.0001 1.66663L67.9751 8.33329H61.6667L66.8167 12.0083L64.8584 18.3333L70.0001 14.425L75.1501 18.3333L73.1917 12.0083L78.3334 8.33329H72.0251Z" fill="#C2C100"/>
                  <path d="M92.0251 8.33329L90.0001 1.66663L87.9751 8.33329H81.6667L86.8167 12.0083L84.8584 18.3333L90.0001 14.425L95.1501 18.3333L93.1917 12.0083L98.3334 8.33329H92.0251Z" fill="#C2C100"/>
                  </svg>
                </div>


                <p className="text-neutral-700">{c.text}</p>

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
