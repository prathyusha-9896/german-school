import React from "react";
import useGerman from "./useGerman";
const avatars: string[] = [
    "/assets/avatar/Avatar1.svg",
    "/assets/avatar/Avatar2.svg",
    "/assets/avatar/Avatar3.svg",
    "/assets/avatar/Avatar4.svg",
    "/assets/avatar/1k.svg"
];

const RingCheck: React.FC<{ color?: string }> = ({ color = "#3AA376" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.6" />
    <path
      d="M6.3 10.1l2.3 2.3L13.7 7.4"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Bullet: React.FC<{ children: React.ReactNode; color: string }> = ({ children, color }) => (
  <li className="flex items-start gap-2">
    <RingCheck />
    <span className="text-[15px] leading-6">{children}</span>
  </li>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { error?: string }> = ({ error, ...props }) => (
  <div className="space-y-1">
    <input
      {...props}
      className={`w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none transition
      placeholder:opacity-60 ${error ? "border-red-400" : "border-gray-200"} focus:border-gray-400`}
    />
    {error ? <p className="text-xs text-red-500">{error}</p> : null}
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }> = ({ error, ...props }) => (
  <div className="space-y-1">
    <textarea
      {...props}
      className={`w-full min-h-[84px] rounded-lg border bg-white px-3 py-3 text-sm outline-none transition
      placeholder:opacity-60 ${error ? "border-red-400" : "border-gray-200"} focus:border-gray-400`}
    />
    {error ? <p className="text-xs text-red-500">{error}</p> : null}
  </div>
);

const German: React.FC = () => {
  const { COLORS, content, form, setField, errors, touched, setTouched, handleSubmit, loading } = useGerman();
  return (
    <section className="w-full" style={{ background: "linear-gradient(180deg,#EEF2FF,#F7F9FF)" }}>
      {/* Scale/1700 with 120px side padding */}
      <div className="mx-auto max-w-[1700px] px-8 md:px-[120px]">
        {/* Frame max width 1500 (centred). 0px column gap on desktop. */}
        <div className="mx-auto max-w-[1500px] py-16 grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_620px] md:gap-0">
          {/* LEFT */}
          <div className="pr-0 md:pr-[40px]"> {/* light breathing room if needed */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
              style={{ backgroundColor: COLORS.bannerText, color: COLORS.primary }}
            >
              <span className="text-[12px] font-medium">{content.badge}</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-black sm:text-5xl">{content.title}</h1>
            <p className="mt-2 text-2xl font-semibold" style={{ color: COLORS.body }}>
              {content.subtitle}
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-6" style={{ color: COLORS.body }}>
              {content.description}
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#courses"
                className="rounded-lg px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: COLORS.primary, color: COLORS.bannerText }}
              >
                {content.ctas.explore}
              </a>
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: COLORS.ctaBg, color: COLORS.ctaText, fontFamily: "Raveo Display, sans-serif", fontWeight: 600 }}
              >
                {content.ctas.book} <span>→</span>
              </a>
            </div>

            {/* Bullets */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <ul className="space-y-2" style={{ color: COLORS.body }}>
                {content.bulletsLeft.map((b) => (
                  <Bullet key={b} color={COLORS.primary}>{b}</Bullet>
                ))}
              </ul>
              <ul className="space-y-2" style={{ color: COLORS.body }}>
                {content.bulletsRight.map((b) => (
                  <Bullet key={b} color={COLORS.primary}>{b}</Bullet>
                ))}
              </ul>
            </div>

            {/* Social proof */}
            <div className="mt-6 flex flex-col items-start gap-3">
            <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Student avatar ${i + 1}`}
                    className="object-cover"
                    loading={i > 1 ? "lazy" : "eager"}
                />
                ))}
            </div>
            <p className="text-sm" style={{ color: COLORS.body }}>
                {content.socialProof}
            </p>
            </div>
          </div>

          {/* RIGHT FRAME (Scale/1500 area) */}
          <div className="w-full md:w-[620px] md:pl-[40px]">
            {/* Card sits inside the frame. Approx card width ~800 scale → real 560–600px */}
            <div className="mx-auto w-full max-w-[580px] rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <h3 className="text-center text-lg font-semibold text-black">{content.formTitle}</h3>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First Name"
                    value={form.firstName}
                    onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                    onChange={(e) => setField("firstName", e.target.value)}
                    error={touched.firstName ? errors.firstName : undefined}
                  />
                  <Input
                    placeholder="Last Name"
                    value={form.lastName}
                    onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                    onChange={(e) => setField("lastName", e.target.value)}
                    error={touched.lastName ? errors.lastName : undefined}
                  />
                </div>

                <Input
                  placeholder="Phone Number"
                  value={form.phone}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  onChange={(e) => setField("phone", e.target.value)}
                  error={touched.phone ? errors.phone : undefined}
                />

                <Input
                  placeholder="Email Address"
                  value={form.email}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  onChange={(e) => setField("email", e.target.value)}
                  error={touched.email ? errors.email : undefined}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    placeholder="Preferred Start Date"
                    value={form.startDate}
                    onBlur={() => setTouched((t) => ({ ...t, startDate: true }))}
                    onChange={(e) => setField("startDate", e.target.value)}
                    error={touched.startDate ? errors.startDate : undefined}
                  />
                  <Input
                    placeholder="Your City"
                    value={form.city}
                    onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                    onChange={(e) => setField("city", e.target.value)}
                    error={touched.city ? errors.city : undefined}
                  />
                </div>

                <Textarea
                  placeholder="Describe your learning needs"
                  value={form.goals}
                  onBlur={() => setTouched((t) => ({ ...t, goals: true }))}
                  onChange={(e) => setField("goals", e.target.value)}
                />

                <label className="mt-2 flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                    className="mt-1"
                  />
                  <span>{content.formConsent}</span>
                </label>

                {/* Scale/1000 button width → full within card */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl font-semibold transition-transform duration-150 hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-60"
                  style={{ backgroundColor: COLORS.ctaBg, color: COLORS.ctaText, fontFamily: "Raveo Display, sans-serif", fontWeight: 600 }}
                >
                  {loading ? "Submitting..." : content.ctas.submit}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default German;
