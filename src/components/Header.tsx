import React from "react";

type HeaderProps = {
  onCtaClick?: () => void;
  ctaLabel?: string;
  ctaBg?: string; // customize CTA background; default matches your mock
};

const Header: React.FC<HeaderProps> = ({
  onCtaClick,
  ctaLabel = "Book Free Trial Class",
  ctaBg = "#A894FF", // light lavender like the screenshot
}) => {
  return (
    <header className="w-full sticky top-0 bg-white">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-4 md:px-8">
        {/* Logo (from /public/logo.svg) */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-auto"
            loading="eager"
          />
        </a>

        {/* Centered Nav (width: 297px, height: 40px, gap: 4px) */}
        <nav
          className="hidden md:flex h-10 w-[297px] items-center justify-between text-sm"
          style={{ color: "#6B6A70" }}
        >
          <a href="#courses" className="hover:opacity-80">
            Courses
          </a>
          <a href="#benefits" className="hover:opacity-80">
            Benefits
          </a>
          <a href="#testimonials" className="hover:opacity-80">
            Testimonials
          </a>
        </nav>

        {/* Right CTA (width: 186, height: 48, padding Scale/300-400, radius Scale/200) */}
        <button
          type="button"
          onClick={onCtaClick}
          className="inline-flex h-[48px] w-[186px] items-center justify-center rounded-[8px] px-2 py-3 transition-transform duration-150 hover:translate-y-[-1px] active:translate-y-0"
          style={{
            backgroundColor: ctaBg,
            fontFamily: "Raveo Display, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            color: "#E4F1FE",
          }}
        >
          {ctaLabel}
        </button>
      </div>
    </header>
  );
};

export default Header;
