import React from "react";
import useGerman from "./useGerman";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

const Input: React.FC<InputProps> = ({ error, type, value, placeholder, ...props }) => {
  const isDate = type === "date";
  const showOverlay = isDate && !value;
  return (
    <div className="relative space-y-1">
      <input
        {...props}
        type={type}
        value={value}
        placeholder={isDate ? undefined : placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none transition placeholder:opacity-60 ${
          error ? "border-red-400" : "border-gray-200"
        } focus:border-gray-400 ${showOverlay ? "date-mask-hidden" : ""}`}
      />
      {showOverlay && placeholder ? (
        <span className="pointer-events-none absolute left-3 top-3 text-sm text-gray-400">
          {placeholder}
        </span>
      ) : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }> = ({
  error,
  ...props
}) => (
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

const GermanForm: React.FC = () => {
  const { COLORS, content, form, setField, errors, touched, setTouched, handleSubmit, loading } =
    useGerman();

  return (
    <div className="w-full md:w-[620px] md:pl-[40px]">
      <div className="mx-auto w/full max-w-[580px] rounded-2xl bg-white p-6 pt-16 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl font-semibold transition-transform duration-150 hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-60"
            style={{
              backgroundColor: COLORS.ctaBg,
              color: COLORS.ctaText,
              fontFamily: "Raveo Display, sans-serif",
              fontWeight: 600
            }}
          >
            {loading ? "Submitting..." : content.ctas.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GermanForm;
