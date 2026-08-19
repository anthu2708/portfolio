import { useCallback, useEffect, useRef, useState } from "react";
import ImageSlot from "./ImageSlot.jsx";
import { projects } from "../data/projects.js";

const STEP = "(min(54vh, 440px) + 44px)";
const OFFSETS = [-2, -1, 0, 1, 2];
const pad = (v) => (v < 10 ? `0${v}` : String(v));
const wrap = (v, n) => ((v % n) + n) % n;

/** Plaque stays put; the stack slides one step per flip and loops 1 → 2 → 3 → 1. */
export default function ProjectCarousel({ medallionShape = "rect", showCatalogNumbers = true }) {
  const [index, setIndex] = useState(0);
  const [sliding, setSliding] = useState(0);
  const timer = useRef(null);
  const n = projects.length;

  const step = useCallback(
    (d) => {
      if (!d || sliding) return;
      setSliding(d);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIndex((i) => wrap(i + d, n));
        setSliding(0);
      }, 560);
    },
    [sliding, n]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const masks = {
    oval: "ellipse(46% 44% at 50% 50%)",
    arch: "polygon(0% 100%, 0% 34%, 8% 16%, 26% 4%, 50% 0%, 74% 4%, 92% 16%, 100% 34%, 100% 100%)",
    rect: "inset(0)",
  };
  const active = projects[wrap(index + sliding, n)];

  return (
    <section
      id="projects"
      className="relative flex min-h-screen flex-wrap items-center justify-center gap-[clamp(32px,5vw,72px)] overflow-hidden border-t border-white/8 px-10 py-16"
    >
      <div
        className="relative shrink-0"
        style={{ width: "calc(min(54vh, 440px) * 0.75)", height: "min(54vh, 440px)" }}
      >
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            transform: `translateY(calc(${-sliding} * ${STEP}))`,
            transition: sliding ? "transform .56s cubic-bezier(.3,.8,.2,1)" : "none",
            willChange: "transform",
          }}
        >
          {OFFSETS.map((off) => {
            const p = projects[wrap(index + off, n)];
            const isActive = off === sliding;
            return (
              <div
                key={off}
                onClick={() => step(off)}
                className="absolute left-0 w-full cursor-pointer [filter:drop-shadow(0_30px_46px_rgba(0,0,0,.55))] hover:[filter:drop-shadow(0_40px_62px_rgba(0,0,0,.6))_brightness(1.08)_contrast(1.04)]"
                style={{
                  top: `calc(${off} * ${STEP})`,
                  height: "min(54vh, 440px)",
                  opacity: isActive ? 1 : 0.28,
                  transform: `scale(${isActive ? 1 : 0.88})`,
                  transition: sliding
                    ? "opacity .56s cubic-bezier(.3,.8,.2,1), transform .56s cubic-bezier(.3,.8,.2,1), filter .56s cubic-bezier(.3,.8,.2,1)"
                    : "filter .2s ease",
                  willChange: "transform, opacity",
                }}
              >
                <div className="metal-plaque scalloped absolute inset-0" />
                <div className="absolute inset-[18px] flex flex-col gap-4 border border-white/20 px-[22px] pt-[22px] pb-[18px] shadow-[0_2px_0_rgba(255,255,255,.45)_inset,0_-2px_3px_rgba(0,0,0,.32)_inset]">
                  <div className="relative flex-1 shadow-[0_-2px_4px_rgba(255,255,255,.4)_inset,0_3px_6px_rgba(0,0,0,.35)_inset]">
                    <div className="absolute inset-0" style={{ clipPath: masks[medallionShape] ?? masks.oval }}>
                      <ImageSlot id={`plaque-${p.slug}`} placeholder="emboss image" defaultSrc={p.image} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-end gap-3">
                    {showCatalogNumbers && (
                      <span className="engraved shrink-0 font-mono text-[clamp(9px,.85vw,12px)] whitespace-nowrap">
                        {p.no}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex min-w-70 max-w-120 flex-1 basis-85 flex-col gap-[18px]">
        <p className="m-0 font-mono text-[11px] tracking-[.28em] text-[#6f737c] uppercase">II — Projects</p>
        <p className="m-0 font-mono text-[11px] tracking-[.24em] text-[#8b8f98] uppercase">
          {active.no} · {active.kind}
        </p>
        <h2 className="m-0 font-display text-[clamp(28px,3.4vw,42px)] leading-tight font-semibold text-paper-100">
          {active.name}
        </h2>
        <div className="h-px w-14 bg-gradient-to-r from-[rgba(215,217,222,.7)] to-transparent" />
        <p className="m-0 max-w-[44ch] text-base leading-relaxed text-paper-300 text-pretty">{active.overview}</p>
        <p className="m-0 font-mono text-xs leading-loose tracking-[.08em] text-paper-500">{active.meta}</p>
        <div className="mt-3 flex items-center gap-4">
          {[
            { d: -1, glyph: "↑" },
            { d: 1, glyph: "↓" },
          ].map((b) => (
            <button
              key={b.d}
              onClick={() => step(b.d)}
              className="metal-strip h-9.5 w-9.5 cursor-pointer rounded-full border border-white/20 text-[15px] text-[#6d7076] shadow-[0_1px_0_rgba(255,255,255,.45)_inset,0_-2px_4px_rgba(0,0,0,.35)_inset,0_6px_14px_rgba(0,0,0,.4)] transition-[filter] hover:brightness-110"
            >
              {b.glyph}
            </button>
          ))}
          <span className="font-mono text-[11px] tracking-[.24em] text-[#8b8f98]">
            {pad(wrap(index + sliding, n) + 1)} / {pad(n)}
          </span>
        </div>
      </div>
    </section>
  );
}
