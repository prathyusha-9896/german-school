"use client";

import React, { useState } from "react";

type FooterProps = {
  onSubscribe?: (email: string) => void;
  brand?: string;        // primary purple
  brandSoft?: string;    // softer purple (CTA background)
  neutralPrimary?: string;
  neutralSecondary?: string;
  divider?: string;
};

export default function Footer({
  onSubscribe,
  brand = "#984DDD",
  brandSoft = "#A996FF",
  neutralPrimary = "#242325",
  neutralSecondary = "#6B6A70",
  divider = "#E7E6EA",
}: FooterProps) {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe?.(email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-[120px] py-12 md:py-16">
        {/* Top row: headline + CTA */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            className="text-4xl md:text-6xl font-semibold leading-[1.15]"
            style={{ color: neutralPrimary, fontFamily: "Raveo Display, sans-serif" }}
          >
            Your Journey to German
            <br className="hidden md:block" /> Fluency Starts Here
          </h2>

          <a
            href="#book-trial"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-white text-[15px] font-semibold"
            style={{ backgroundColor: brandSoft, fontFamily: "Raveo Display, sans-serif" }}
          >
            Book Free Trial Class Today
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full" style={{ background: divider }} />

        {/* Middle: logo + newsletter + nav */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Left block (logo + newsletter) */}
          <div className="md:col-span-7">
            {/* Logo */}
            <img src="/logo.svg" alt="" />

            {/* Copy */}
            <p
              className="mt-6 text-[15px] leading-6"
              style={{ color: neutralSecondary, fontFamily: "Raveo Display, sans-serif" }}
            >
              Subscribe to stay up to date with the latest updates and feature releases.
            </p>

            {/* Newsletter input */}
            <form onSubmit={submit} className="mt-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., username@email.com"
                  className="w-full rounded-2xl border bg-white px-4 py-4 pr-40 text-[15px] outline-none transition placeholder:opacity-50"
                  style={{
                    borderColor: divider,
                    fontFamily: "Raveo Display, sans-serif",
                    color: neutralPrimary,
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 rounded-xl px-4 py-2 text-white font-semibold"
                  style={{
                    background: brandSoft,
                    fontFamily: "Raveo Display, sans-serif",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Right navigation columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <nav>
              <div
                className="mb-4 text-[16px] font-semibold"
                style={{ color: neutralPrimary, fontFamily: "Raveo Display, sans-serif" }}
              >
                Courses
              </div>
              <ul className="space-y-4">
                {["Beginner (A1–A2)", "Intermediate (B1–B2)", "Advanced (C1–C2)"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="text-[15px] leading-6 hover:underline"
                      style={{ color: neutralSecondary, fontFamily: "Raveo Display, sans-serif" }}
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <div
                className="mb-4 text-[16px] font-semibold"
                style={{ color: neutralPrimary, fontFamily: "Raveo Display, sans-serif" }}
              >
                Legal
              </div>
              <ul className="space-y-4">
                {["Privacy Policy", "Terms of Use"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="text-[15px] leading-6 hover:underline"
                      style={{ color: neutralSecondary, fontFamily: "Raveo Display, sans-serif" }}
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-10 h-px w-full" style={{ background: divider }} />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <span
            className="text-[15px]"
            style={{ color: neutralSecondary, fontFamily: "Raveo Display, sans-serif" }}
          >
            ©Copyright 2025
          </span>
          <span
            className="text-[15px]"
            style={{ color: neutralSecondary, fontFamily: "Raveo Display, sans-serif" }}
          >
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
