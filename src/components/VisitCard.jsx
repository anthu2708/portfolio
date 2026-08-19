import { useRef, useState } from "react";

const links = [
  { label: "phungtranthuan2005@gmail.com", href: "mailto:phungtranthuan2005@gmail.com", icon: "mail" },
  { label: "linkedin.com/in/anthu2708", href: "https://linkedin.com/in/anthu2708", icon: "linkedin" },
  { label: "github.com/anthu2708", href: "https://github.com/anthu2708", icon: "github" },
  { label: "(672) 558-2708", href: "tel:+16725582708", icon: "phone" },
];

const ICONS = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

const BASE_TILT = { rx: 6, ry: -4 };
const BASE_GLOW = { x: 30, y: 20 };

export default function VisitCard() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState(BASE_TILT);
  const [glow, setGlow] = useState(BASE_GLOW);
  const [active, setActive] = useState(false);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: -(py - 0.5) * 28, ry: (px - 0.5) * 36 });
    setGlow({ x: px * 100, y: py * 100 });
    setActive(true);
  };

  const onLeave = () => {
    setTilt(BASE_TILT);
    setGlow(BASE_GLOW);
    setActive(false);
  };

  return (
    <div id="contact" className="flex flex-1 basis-70 flex-col gap-4">
      <p className="m-0 font-mono text-[11px] tracking-[.28em] text-[#6f737c] uppercase">IV - Contact</p>

      {/* The card */}
      <div
        className="relative mt-2 w-full max-w-[340px]"
        style={{ perspective: "900px" }}
      >
        <div
          ref={cardRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative w-full"
          style={{
            aspectRatio: "1.75 / 1",
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 10px 16px rgba(0,0,0,.45))",
            transition: active ? "transform 80ms linear" : "transform 650ms cubic-bezier(.22,1.4,.36,1)",
          }}
        >
          {/* outer glow lifting the card off the dark background */}
          <div
            className="pointer-events-none absolute -inset-3 rounded-[16px] blur-xl transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 70%)",
              opacity: active ? 0.9 : 0.5,
            }}
          />

          {/* card face - brighter brushed-aluminum gradient */}
          <div className="absolute inset-0 rounded-[10px] bg-[linear-gradient(152deg,#f4f5f7_0%,#c3c6cb_20%,#eef0f2_36%,#9a9da3_56%,#e2e4e7_78%,#aeb1b7_100%)]" />

          {/* static diagonal foil streak, always visible */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[10px] mix-blend-screen"
            style={{
              background: `linear-gradient(${115 + tilt.ry * 1.4}deg, rgba(255,255,255,0) 28%, rgba(255,255,255,.85) 47%, rgba(255,255,255,0) 64%)`,
            }}
          />

          {/* reflective sheen, follows pointer like light hitting brushed metal */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[10px] mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,.5) 20%, rgba(255,255,255,0) 52%)`,
              opacity: active ? 1 : 0.7,
            }}
          />

          {/* bright rim to separate the card edge from the dark page */}
          <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,.5)_inset]" />

          {/* inner border */}
          <div className="absolute inset-[10px] rounded-[5px] border border-white/20 shadow-[0_2px_0_rgba(255,255,255,.38)_inset,0_-2px_4px_rgba(0,0,0,.3)_inset] flex flex-col justify-between px-[16px] py-[14px]">
            {/* top: name + role */}
            <div>
              <p
                className="m-0 font-display text-[clamp(13px,2.2vw,17px)] font-semibold tracking-[.14em] uppercase"
                style={{ color: "#2e3034", textShadow: "0 1px 0 rgba(255,255,255,.7), 0 -1px 0 rgba(0,0,0,.4)" }}
              >
                An Phung
              </p>
              <p
                className="m-0 mt-[3px] font-mono text-[clamp(7px,1vw,9px)] tracking-[.22em] uppercase"
                style={{ color: "#454850" }}
              >
                Software Engineer · CS @ UBC
              </p>
            </div>

            {/* divider */}
            <div className="h-px w-full bg-gradient-to-r from-[rgba(255,255,255,.18)] via-[rgba(255,255,255,.06)] to-transparent" />

            {/* bottom: contact links */}
            <div className="flex flex-col gap-[5px]">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="font-mono text-[clamp(7px,1vw,9px)] tracking-[.1em] text-[#454850] no-underline transition-colors hover:text-[#15161a]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* subtle edge thickness */}
          <div
            className="absolute inset-0 rounded-[10px]"
            style={{
              transform: "translateZ(-3px)",
              background: "rgba(0,0,0,.5)",
            }}
          />
        </div>
      </div>

      {/* icon links */}
      <div className="flex items-center gap-3 mt-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={l.icon}
            className="metal-strip flex h-9.5 w-9.5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 text-[#6d7076] shadow-[0_1px_0_rgba(255,255,255,.45)_inset,0_-2px_4px_rgba(0,0,0,.35)_inset,0_6px_14px_rgba(0,0,0,.4)] transition-[filter,color] hover:text-[#2e3034] hover:brightness-110"
          >
            <span className="h-4 w-4">{ICONS[l.icon]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
