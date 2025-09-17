import React, { useEffect, useRef } from "react";

function MarqueeChipsLoop({
  chips,
  bg = "rgba(112, 86, 86, 0.20)",   // per-level chipBg will override
  speed = 40,                        // px/sec
}: {
  chips: string[];
  bg?: string;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(0);
  const x = useRef<number>(0);
  const GAP_PX = 12;                 // matches gap-3

  useEffect(() => {
    const step = (t: number) => {
      if (!lastT.current) lastT.current = t;
      const dt = (t - lastT.current) / 1000;
      lastT.current = t;

      x.current -= speed * dt; // move left in px

      const track = trackRef.current;
      if (track && track.firstElementChild) {
        const first = track.firstElementChild as HTMLElement;
        const firstWidth = first.offsetWidth;

        // When first chip fully left + gap -> move it to the end and shift x so there’s no jump
        if (-x.current >= firstWidth + GAP_PX) {
          track.appendChild(first);
          x.current += firstWidth + GAP_PX;
        }
        track.style.transform = `translateX(${x.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    const onResize = () => { x.current = 0; lastT.current = 0; if (trackRef.current) trackRef.current.style.transform = "translateX(0px)"; };
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [chips, speed]);

  return (
    <div
      className="absolute inset-x-4 bottom-4 overflow-hidden rounded-[20px] pointer-events-none"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, rgba(0,0,0,.85) 8%, rgba(0,0,0,.85) 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0, rgba(0,0,0,.85) 8%, rgba(0,0,0,.85) 92%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex gap-3 will-change-transform">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-3 py-2 text-[14px] leading-[21px] font-[600]"
            style={{
              borderRadius: 39,
              background: bg,                         // per-level color
              boxShadow: "0 4px 54.5px 0 rgba(0,0,0,0.07)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(9px)", 
              color: "#fff",
            }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeChipsLoop;
