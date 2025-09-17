'use client';

import React from 'react';
import useSegmentation from './useSegmentation';

/** Typography — identical to LearnMode title tokens */
const type = {
  caption:
    "text-[14px] leading-[21px] font-[400] [font-family:'Raveo_Display',sans-serif]",
  h1:
    "text-[40px] leading-[50px] font-[600] [font-family:'Raveo_Display',sans-serif] text-[#242325]",
  item:
    "text-[16px] leading-[24px] font-[400] [font-family:'Raveo_Display',sans-serif]",
  itemBold:
    "text-[16px] leading-[24px] font-[600] [font-family:'Raveo_Display',sans-serif]",
};

/** Circular success icon (green ring + check) */
const RingCheck: React.FC<{ color?: string }> = ({ color = '#2ECC71' }) => (
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

const Segmentation: React.FC = () => {
  const { UI, image, items, cta } = useSegmentation();

  return (
    <section className="w-full">
      {/* Scale/1600, side padding 120, block padding ~64 */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-[120px] py-16 md:py-24">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[568px_minmax(0,1fr)] md:gap-16">
          {/* LEFT: Image (568×436, radius 24) */}
          <div
            className="relative flex w-[568px] max-w-full h-[436px] justify-center items-center shrink-0 rounded-[24px] overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT: Card-like stack */}
          <div className="w-full rounded-[16px]">
            {/* Caption pill */}
            <div
              className={`inline-flex items-center gap-[6px] rounded-[36px] border px-3 py-1 ${type.caption}`}
              style={{
                background: UI.captionBg,
                borderColor: UI.captionBorder,
                color: UI.tertiary,
              }}
            >
              Segmentation
            </div>

            {/* Heading (same as LearnMode) */}
            <h1 className={`mt-4 ${type.h1}`}>Is This Course<br className="hidden md:block" /> Right For You?</h1>

            {/* Points */}
            <ul className="mt-6 space-y-3">
              {items.map((it, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0">
                    <RingCheck color={UI.success} />
                  </span>
                  <p className={`${type.item}`} style={{ color: UI.secondary }}>
                    {it.text}
                  </p>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-[12px] px-4 py-3 text-[14px] font-[600]"
              style={{
                background: UI.ctaBg,
                color: UI.ctaText,
                fontFamily: 'Raveo Display, sans-serif',
              }}
            >
              {cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Segmentation;
