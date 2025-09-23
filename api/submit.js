// api/submit.js
import nodemailer from "nodemailer";

/** Small helper to safely read envs on the server */
const env = (k, fallback = "") => process.env[k] ?? fallback;

const transporter = nodemailer.createTransport({
  host: env("SMTP_HOST"),
  port: Number(env("SMTP_PORT") || 587),
  secure: env("SMTP_PORT") === "465", // true for 465, false for 587
  auth: {
    user: env("SMTP_USER"),
    pass: env("SMTP_PASS"),
  },
});

function renderAdminHTML(payload) {
  const rows = Object.entries(payload)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;background:#f7f7fb">${k}</td><td style="padding:6px 10px">${String(
          v ?? ""
        )}</td></tr>`
    )
    .join("");
  return `
    <div style="font-family:Inter,system-ui,Arial,sans-serif">
      <h2 style="margin:0 0 12px">${env("BRAND_NAME", "New Lead")} — Form Submission</h2>
      <table style="border-collapse:collapse;border:1px solid #e9e9f2">${rows}</table>
      <p style="color:#778">This message was generated automatically by the website form.</p>
    </div>
  `;
}

function renderUserHTML(firstName) {
  const brand = env("BRAND_NAME", "Our Team");
  return `
    <div style="font-family:Inter,system-ui,Arial,sans-serif">
      <h2>Thanks for contacting ${brand}${firstName ? ", " + firstName : ""}!</h2>
      <p>We’ve received your details. A counselor will reach out shortly to help you get started.</p>
      <p>— ${brand}</p>
    </div>
  `;
}

/** Vercel serverless handler */
export default async function handler(req, res) {
  // Only POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const payload = req.body || {};

    // Honeypot (simple spam guard)
    if (payload.website) {
      return res.json({ ok: true }); // pretend success, but do nothing
    }

    // Minimal validation (keep in sync with your client-side)
    const required = ["firstName", "lastName", "phone", "email", "startDate", "city", "consent"];
    for (const k of required) {
      if (payload[k] === undefined || payload[k] === "" || payload[k] === false) {
        return res.status(400).json({ ok: false, error: `Missing or invalid field: ${k}` });
      }
    }

    // 1) Send admin/review email
    await transporter.sendMail({
      from: env("MAIL_FROM"),
      to: env("MAIL_TO"),
      subject: `New Lead • ${payload.firstName} ${payload.lastName} • ${payload.city}`,
      replyTo: payload.email, // so you can reply straight to the student
      html: renderAdminHTML({
        FirstName: payload.firstName,
        LastName: payload.lastName,
        Phone: payload.phone,
        Email: payload.email,
        PreferredStartDate: payload.startDate,
        City: payload.city,
        Goals: payload.goals,
        Consent: payload.consent ? "Yes" : "No",
        Timestamp: new Date().toISOString(),
      }),
    });

    // 2) Send user auto-reply (optional but nice UX)
    await transporter.sendMail({
      from: env("MAIL_FROM"),
      to: payload.email,
      subject: `We received your request — ${env("BRAND_NAME", "German School")}`,
      html: renderUserHTML(payload.firstName),
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ ok: false, error: "Email sending failed" });
  }
}
