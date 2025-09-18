import React from "react";

type VideoCardProps = {
  name: string;
  videoSrc: string;
  posterSrc: string;
  verified?: boolean;
  rating?: number;
};

export function VideoTestimonialCard({
  name,
  videoSrc,
  posterSrc,
  verified = true,
  rating = 5,
}: VideoCardProps) {
  const ref = React.useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [showPoster, setShowPoster] = React.useState(true);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused || v.ended) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <article className="group relative w-[260px] overflow-hidden rounded-2xl bg-black/5 shadow-md ring-1 ring-black/10">
      {/* Media layer */}
      <div className="relative h-[330px] w-full">
        {/* Video */}
        <video
          ref={ref}
          src={videoSrc}
          poster={posterSrc}               // still useful for initial paint
          playsInline
          muted={false}
          controls={playing}
          preload="metadata"
          onPlay={() => { setPlaying(true); setShowPoster(false); }}
          onPause={() => { setPlaying(false); setShowPoster(true); }}
          onEnded={() => {
            setPlaying(false);
            setShowPoster(true);
            try { if (ref.current) ref.current.currentTime = 0; } catch {}
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Poster overlay (shows when paused/ended) */}
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 pointer-events-none ${showPoster ? "opacity-100" : "opacity-0"}`}
        />

        {/* Center play button */}
        {!playing && (
          <button
            type="button"
            aria-label={`Play video testimonial from ${name}`}
            onClick={togglePlay}
            className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 p-3 backdrop-blur-sm transition hover:bg-black/80 border-2 border-white focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {/* Bottom gradient for text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <div className="h-24 w-full bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </div>

        {/* Name + verified + stars (centered) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 px-3 text-white">
          <div className="mb-2 flex items-center justify-center gap-2 text-sm font-medium">
            <span className="truncate">{name}</span>
            {verified && (
              <span className="inline-flex items-center justify-center rounded-full bg-white/90 p-[2px]">
                <svg viewBox="0 0 24 24" width="12" height="12" className="text-emerald-600" fill="currentColor">
                  <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-center text-[12px] tracking-[0.3em] opacity-90">
            {"★".repeat(Math.max(0, Math.min(5, rating)))}
          </p>
        </div>

        {/* Click anywhere to play/pause (white border optional) */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Toggle play/pause"
          className="absolute inset-0 z-40 rounded-[inherit] border-2 border-white/0 focus:border-white/80 focus:outline-none"
        />
      </div>
    </article>
  );
}

/* ——— Demo row to match your screenshot ——— */

type Item = { name: string; poster: string; video: string };

export default function VideoTestimonialsRow() {
  const items: Item[] = [
    {
      name: "Devon Lane",
      poster:
        "/assets/testimonial1.svg",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    {
      name: "Guy Hawkins",
      poster:
        "/assets/testimonial2.svg",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    {
      name: "Annette Black",
      poster:
        "/assets/testimonial3.svg",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
    {
      name: "Jenny Wilson",
      poster:
        "/assets/testimonial4.svg",
      video:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    },
  ];

  const scrollerStyle: React.CSSProperties = {
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",     // Firefox
    msOverflowStyle: "none",    // IE/Edge
  };
  return (
    <section className="w-full bg-[#E4F1FE] pb-10">
      <div className="mx-auto max-w-[1600px] px-4">
        {/* Mobile: horizontal scroll, overflow hidden outside */}
        <div className="relative md:hidden overflow-hidden">
          <div
            className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
            style={scrollerStyle}
          >
            {items.map((it) => (
              <div key={it.name} className="snap-center shrink-0">
                <VideoTestimonialCard
                  name={it.name}
                  videoSrc={it.video}
                  posterSrc={it.poster}
                  verified
                  rating={5}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: regular wrapped grid */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-6">
          {items.map((it) => (
            <VideoTestimonialCard
              key={it.name}
              name={it.name}
              videoSrc={it.video}
              posterSrc={it.poster}
              verified
              rating={5}
            />
          ))}
        </div>
      </div>

      {/* Hide webkit scrollbar for the mobile scroller */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
