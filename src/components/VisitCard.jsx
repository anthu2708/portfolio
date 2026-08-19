const links = [
  { label: "phungtranthuan2005@gmail.com", href: "mailto:phungtranthuan2005@gmail.com" },
  { label: "linkedin.com/in/anthu2708", href: "https://linkedin.com/in/anthu2708" },
  { label: "github.com/anthu2708", href: "https://github.com/anthu2708" },
  { label: "(672) 558-2708", href: "tel:+16725582708" },
];

export default function VisitCard() {
  return (
    <div id="contact" className="flex flex-1 basis-70 flex-col gap-4">
      <p className="m-0 font-mono text-[11px] tracking-[.28em] text-[#6f737c] uppercase">IV — Contact</p>
      <h2 className="m-0 font-display text-[clamp(22px,2.4vw,30px)] font-semibold text-paper-100">Say hello</h2>

      {/* The card */}
      <div
        className="relative mt-2 w-full max-w-[340px]"
        style={{ perspective: "900px" }}
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: "1.75 / 1",
            transform: "rotateX(6deg) rotateY(-4deg)",
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 22px 38px rgba(0,0,0,.65))",
          }}
        >
          {/* card face */}
          <div className="metal-plaque absolute inset-0 rounded-[10px]" />

          {/* inner border */}
          <div className="absolute inset-[10px] rounded-[5px] border border-white/20 shadow-[0_2px_0_rgba(255,255,255,.38)_inset,0_-2px_4px_rgba(0,0,0,.3)_inset] flex flex-col justify-between px-[16px] py-[14px]">
            {/* top: name + role */}
            <div>
              <p className="m-0 engraved font-display text-[clamp(13px,2.2vw,17px)] font-semibold tracking-[.14em] uppercase">
                An Phung
              </p>
              <p className="m-0 mt-[3px] font-mono text-[clamp(7px,1vw,9px)] tracking-[.22em] text-[#75787e] uppercase">
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
                  className="font-mono text-[clamp(7px,1vw,9px)] tracking-[.1em] text-[#82858b] no-underline transition-colors hover:text-[#c8cad0]"
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
    </div>
  );
}
