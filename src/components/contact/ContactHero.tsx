import React from "react";
import useContactHero from "./useContactHero";
import { DatePicker } from "antd";            
import dayjs, { type Dayjs } from "dayjs";
const avatars: string[] = [
  "/assets/socialicons/Facebook.svg",
  "/assets/socialicons/Instagram.svg",
  "/assets/socialicons/LinkedIn.svg",
  "/assets/socialicons/YouTube.svg",
  "/assets/socialicons/Twitter.svg",
];

const RingCheck: React.FC<{ color?: string }> = ({ color = "#3AA376" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.6" />
    <path d="M6.3 10.1l2.3 2.3L13.7 7.4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2">
    <RingCheck />
    <span className="md:text-[15px] text-[13px] leading-6">{children}</span>
  </li>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { error?: string }> = ({ error, ...props }) => (
  <div className="space-y-1">
    <input
      {...props}
      className={`w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none transition placeholder:opacity-60 ${
        error ? "border-red-400" : "border-gray-200"
      } focus:border-gray-400`}
    />
    {error ? <p className="text-xs text-red-500">{error}</p> : null}
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }> = ({ error, ...props }) => (
  <div className="space-y-1">
    <textarea
      {...props}
      className={`w-full min-h-[84px] rounded-lg border bg-white px-3 py-3 text-sm outline-none transition placeholder:opacity-60 ${
        error ? "border-red-400" : "border-gray-200"
      } focus:border-gray-400`}
    />
    {error ? <p className="text-xs text-red-500">{error}</p> : null}
  </div>
);

const ContactHero: React.FC = () => {
  const { COLORS, content, form, setField, errors, touched, setTouched, handleSubmit, loading } = useContactHero();

  return (
    <section className="w-full pt-20" style={{ background: "linear-gradient(180deg,#EEF2FF,#F7F9FF)" }}>
      <div className="mx-auto max-w-[1700px] px-6 md:px-[120px]">
        {/* grid becomes 1 col on mobile (hero centered), 2 cols on md+ */}
        <div className="mx-auto grid max-w-[1500px] items-start gap-10 py-12 md:grid-cols-[minmax(0,1fr)_620px] md:gap-0 md:py-16">
          {/* LEFT / HERO */}
          <div className="mx-auto max-w-[520px] text-center md:mx-0 md:max-w-none md:text-left">
            <h1 className="text-[28px] leading-[60px] font-semibold text-black sm:text-[32px] md:text-[48px]">
              We are always happy <br />to help
            </h1>
            {/* <p className="text-[28px] leading-[50px] font-normal text-black sm:text-[32px] md:text-[40px]" style={{ color: COLORS.body }}>
              {content.subtitle}
            </p> */}

            <p className="mt-3 text-[14px] leading-6 md:mt-4 md:max-w-xl" style={{ color: COLORS.body }}>
              Whether you're a prospective student, parent, alumni, or community <br /> member, we value your feedback and are eager to assist you.
            </p>


            {/* Bullets — 2x2 on mobile like the mock */}
            {/* <div className="mt-6 grid gap-2 grid-cols-2 text-[14px] text-[#6B6A70] max-w-[564px] ">
                <div className="flex-col"><p className="font-semibold">Email:</p> info@germanlanguageschool.com</div>
                <div><p className="font-semibold">Address:</p> German Language School, 123 Learning Street, Pune, India – 411001</div>
                <div><p className="font-semibold">Phone:</p> +91 98765 43210</div>
            </div> */}

            {/* Social proof (stacked + centered on mobile) */}
            {/* <div className="mt-6 flex flex-col items-center gap-3 md:items-start">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Student avatar ${i + 1}`}
                    className=" rounded-full object-cover "
                    loading={i > 1 ? "lazy" : "eager"}
                  />
                ))}
              </div>
              <p className="text-sm" style={{ color: COLORS.body }}>
                {content.socialProof}
              </p>
            </div> */}
          </div>
          <div className="relative">
            <div className="absolute -top-20 left-60 animate-bounce ">
               <img src="/msg.svg" alt="" />
            </div>
          <div className=" w-full md:w-[620px] md:pl-[40px] ">
            <div className="mx-auto w-full max-w-[580px] rounded-2xl bg-white p-6 pt-16 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
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
                    <DatePicker
                    placeholder="Preferred Start Date"
                    value={form.startDate ? dayjs(form.startDate) : null}
                    onChange={(value: Dayjs | null) => {
                        setField("startDate", value ? value.format("YYYY-MM-DD") : "");
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, startDate: true }))}
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
      </div>
    </section>
  );
};

export default ContactHero;
