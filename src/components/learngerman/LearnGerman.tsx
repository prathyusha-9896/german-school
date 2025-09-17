import React from "react";
import useLearnGerman from "./useLearnGerman";

/** Card shell */
function FeatureCard({
  title,
  subtitle,
  iconInline,
  accent = "#E9D8FF",     // light lavender bg
  badge = "#E4F1FE"        // pale blue bg for icon holder
}: {
  title: string;
  subtitle: string;
  iconInline: string;
  accent: string;
  badge: string;
}) {
  return (
    <div
      className="rounded-2xl"
      style={{ backgroundColor: accent }}
    >
      {/* padding 64 = p-16, gap ~ 24 between text and icon on large */}
      <div className="flex items-center justify-between p-8 md:p-16 gap-6">
        {/* Left text block */}
        <div className="min-w-0">
          <h4
            className="truncate"
            style={{
              color: "#242325",
              fontFamily: "Raveo Display, sans-serif",
              fontSize: "28px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "35px"
            }}
          >
            {title}
          </h4>
          <p
            className="mt-2"
            style={{
              color: "#47464A",
              fontFamily: "Raveo Display, sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "30px"
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Right icon block (84 square, soft bg, rounded) */}
        <div
          className="hidden md:flex"
          aria-hidden="true"
        >
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: iconInline }}
              className="block "
            />
        </div>
      </div>
    </div>
  );
}

const LearnGerman: React.FC = () => {
  const { COLORS, items } = useLearnGerman();

  return (
    <section
      className="w-full"
      style={{ background: "linear-gradient(180deg,#EEF2FF,#F7F9FF)" }}
    >
      {/* Scale/1700, side padding 120 */}
      <div className="mx-auto max-w-[1700px] px-6 md:px-[120px] py-16 md:py-24">
        {/* Two columns: left sticky text, right scrolling cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_700px]">
          {/* LEFT — Sticky */}
          <div className="relative">
            <div className="sticky top-24 md:top-28">
              {/* Caption */}
              <div
                className="inline-block rounded-full px-3 py-1 mb-3"
                style={{ color: "#6B6A70", fontFamily: "Raveo Display, sans-serif",
                         fontWeight: 400, fontSize: "14px", lineHeight: "21px",
                         backgroundColor: COLORS.bannerText }}
              >
                Learn German With Us
              </div>

              {/* H2 */}
              <h2
                style={{
                  color: "#242325",
                  fontFamily: "Raveo Display, sans-serif",
                  fontSize: "40px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "50px"
                }}
              >
                Why 1000+ Students Chose <br />
                Online German SKOOL
              </h2>
            </div>
          </div>

          {/* RIGHT — Cards scroll up. Top offset ~128px from guide */}
          <div className="flex flex-col gap-8 md:gap-8 pt-10 md:pt-32">
            {items.map((f, i) => (
              <FeatureCard
                key={i}
                title={f.title}
                subtitle={f.subtitle}
                iconInline={f.iconInline}
                accent={i % 2 === 0 ? "#E9D8FF" : "#E4F1FE"}
                badge="#E4F1FE"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnGerman;
