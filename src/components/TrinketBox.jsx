import { useRef, useState } from "react";
import ImageSlot from "./ImageSlot.jsx";
import Ransom from "./Ransom.jsx";
import { createDrag } from "../lib/drag.js";

const DEFAULT_POS = {
  contact:    { x: 5.4,   y: 7.5   },
  cv:         { x: 12.82, y: 58.19 },
  experience: { x: 71.81, y: 85.93 },
  projects:   { x: 53.87, y: 7.12  },
};

const PAPER_3  = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='0.16'/%3E%3C/svg%3E\")";
const PAPER_6  = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='6'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='0.16'/%3E%3C/svg%3E\")";
const PAPER_9  = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='9'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='0.16'/%3E%3C/svg%3E\")";
const PAPER_11 = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' seed='11'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='0.16'/%3E%3C/svg%3E\")";
const RECEIPT_EDGE = "polygon(0% 0%, 100% 0%, 100% 95%, 92% 100%, 83% 95%, 75% 100%, 67% 95%, 58% 100%, 50% 95%, 42% 100%, 33% 95%, 25% 100%, 17% 95%, 8% 100%, 0% 95%)";
const POLAROID_HOME = { x: 5, y: 15 };

/** Closed tin → tap the lid → the lid flips up and the objects inside become the navigation. */
export default function TrinketBox({ collageWords = "about me / an phung" }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(DEFAULT_POS);
  const [polaroid, setPolaroid] = useState(POLAROID_HOME);
  const [lifted, setLifted] = useState(null);
  const tray = useRef(null);
  const lidTray = useRef(null);

  const toggle = () => {
    setOpen((o) => !o);
    setPolaroid(POLAROID_HOME);
    setLifted(null);
  };

  const item = (id, href) => ({
    "data-draggable": true,
    onPointerDown: createDrag({
      containerRef: tray,
      onLift: () => setLifted(id),
      onMove: (p) => setPos((s) => ({ ...s, [id]: p })),
      onClick: () => href && (window.location.hash = href),
    }),
    style: { left: `${pos[id].x}%`, top: `${pos[id].y}%`, zIndex: lifted === id ? 9 : 4 },
  });

  const dragPolaroid = createDrag({
    containerRef: lidTray,
    onLift: () => setLifted("polaroid"),
    onMove: setPolaroid,
  });

  // The tin shrinks with the viewport so lid + base stay centred when open.
  const tinWidth = "min(460px, 78vw, calc((100vh - 190px) * 0.8))";
  const reserve = open ? `calc(${tinWidth} * 0.625 + 12px)` : "24px";
  const grab = "cursor-grab touch-none select-none";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-11 px-8 pt-18 pb-24">
      <p className="m-0 font-mono text-[11px] tracking-[.34em] text-[#7e828b] uppercase">
        An Phung — a collection of artifacts
      </p>

      <div
        className="transition-[margin-top] duration-[1100ms] ease-[cubic-bezier(.3,.8,.2,1)]"
        style={{ perspective: "1600px", width: tinWidth, marginTop: reserve }}
      >
        <div className="relative aspect-[8/5] w-full [transform-style:preserve-3d]">
          {/* base */}
          <div className="metal-base absolute inset-0 rounded-[30px] shadow-[0_2px_0_rgba(255,255,255,.4)_inset,0_-6px_14px_rgba(0,0,0,.4)_inset,0_40px_70px_rgba(0,0,0,.55)]">
            <div
              ref={tray}
              className="velvet absolute inset-[22px] overflow-hidden rounded-[14px] shadow-[0_-2px_5px_rgba(255,255,255,.2)_inset,0_6px_14px_rgba(0,0,0,.5)_inset]"
              style={{ containerType: "size" }}
            >
              {/* engraved name card → contact */}
              <div
                {...item("contact", "#contact")}
                className={`absolute aspect-[1.72/1] w-[40%] -rotate-[1.4deg] bg-[linear-gradient(152deg,#cdcfd4_0%,#8d9096_32%,#b2b5bb_54%,#75787e_78%,#a9acb2_100%)] p-[5px] shadow-[0_6px_16px_rgba(0,0,0,.55)] ${grab}`}
              >
                <div className="flex h-full w-full flex-col justify-between border border-white/20 px-2 py-1.5 shadow-[0_1px_0_rgba(255,255,255,.3)_inset]">
                  <div className="flex flex-col gap-[2px]">
                    <span className="engraved font-display text-[10px] font-semibold tracking-[.14em] uppercase">An Phung</span>
                    <span className="font-mono text-[6px] tracking-[.2em] text-[#7f8288] uppercase">contact</span>
                  </div>
                  <span className="font-mono text-[6px] tracking-[.1em] text-[#82858b]">Vancouver, BC</span>
                </div>
              </div>

              {/* receipt → cv */}
              {(() => {
                const cvItem = item("cv", "#cv");
                return <div
                {...cvItem}
                className={`absolute flex w-[34%] flex-col gap-[3px] rotate-[1.6deg] px-[6px] pt-[6px] pb-[10px] text-[#2c2620] shadow-[0_6px_16px_rgba(0,0,0,.5)] ${grab}`}
                style={{
                  ...cvItem.style,
                  containerType: "inline-size",
                  clipPath: RECEIPT_EDGE,
                  backgroundColor: "#f4f1e7",
                  backgroundImage: `${PAPER_9}, linear-gradient(180deg,#f8f5ec,#e9e4d5)`,
                }}
              >
                <span className="text-center font-mono text-[5cqw] tracking-[.16em] uppercase">curriculum vitae</span>
                <span className="block h-px bg-[repeating-linear-gradient(90deg,#2c2620_0_2px,transparent_2px_4px)]" />
                <span className="flex justify-between font-mono text-[5cqw]"><span>an phung</span><span>pdf</span></span>
                <span className="flex justify-between font-mono text-[5cqw]"><span>planview</span><span>2026</span></span>
                <span className="flex justify-between font-mono text-[5cqw]"><span>thang long</span><span>2024</span></span>
                <span className="block h-px bg-[repeating-linear-gradient(90deg,#2c2620_0_2px,transparent_2px_4px)]" />
                <span className="text-center font-mono text-[5cqw] tracking-[.16em] uppercase">tap to open</span>
              </div>;
              })()}

              {/* brass tag → experience */}
              <div
                {...item("experience", "#experience")}
                className={`absolute flex w-[22%] items-center gap-[6px] rounded-full -rotate-[2.2deg] bg-[linear-gradient(150deg,#e6cd7a_0%,#b8942f_38%,#d8bd60_62%,#8f6f18_100%)] py-[5px] px-[8px] shadow-[0_5px_14px_rgba(0,0,0,.5),0_1px_0_rgba(255,255,255,.4)_inset] ${grab}`}
              >
                <span className="block h-[7px] w-[7px] shrink-0 rounded-full bg-[#4a3808] shadow-[0_1px_0_rgba(255,255,255,.35)]" />
                <span className="font-mono text-[6px] tracking-[.16em] text-[#5a4406] uppercase [text-shadow:0_1px_0_rgba(255,255,255,.35)]">
                  experience
                </span>
              </div>

              {/* paper stack → projects */}
              <div {...item("projects", "#projects")} className={`absolute aspect-[3/4] w-[31%] ${grab}`}>
                {[
                  { rotate: "-5.5deg", tx: "-4%", ty: "2%", tex: PAPER_3,  top: "#f8f6ee", bottom: "#e6e2d6" },
                  { rotate: "3deg",    tx: "3%",  ty: "1%", tex: PAPER_6,  top: "#faf8f1", bottom: "#e9e5d9" },
                ].map((sheet, i) => (
                  <span
                    key={i}
                    className="absolute inset-0 shadow-[0_6px_16px_rgba(0,0,0,.45)]"
                    style={{
                      transform: `rotate(${sheet.rotate}) translate(${sheet.tx}, ${sheet.ty})`,
                      backgroundImage: `${sheet.tex}, linear-gradient(170deg,${sheet.top},${sheet.bottom})`,
                    }}
                  />
                ))}
                <span
                  className="absolute inset-0 flex items-end justify-end px-[7%] pb-[5%] shadow-[0_8px_20px_rgba(0,0,0,.5)]"
                  style={{ backgroundImage: `${PAPER_11}, linear-gradient(170deg,#fcfaf4,#ece8dc)` }}
                >
                  <span className="text-[18px] text-[#2a2218]" style={{ fontFamily: "Signerica, 'Ms Madi', cursive" }}>
                    projects
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* lid */}
          <div
            onClick={toggle}
            className="absolute inset-0 cursor-pointer origin-top transition-transform duration-[1100ms] ease-[cubic-bezier(.3,.8,.2,1)] [transform-style:preserve-3d]"
            style={{ transform: open ? "rotateX(-179.4deg) translateZ(1px)" : "rotateX(0deg) translateZ(14px)" }}
          >
            {/* outer face */}
            <div className="metal-lid absolute inset-0 flex items-center justify-center rounded-[30px] [backface-visibility:hidden] shadow-[0_3px_0_rgba(255,255,255,.5)_inset,0_-8px_18px_rgba(0,0,0,.35)_inset,0_26px_48px_rgba(0,0,0,.5)]">
              <div className="absolute inset-[18px] rounded-[20px] border border-white/15 shadow-[0_2px_0_rgba(255,255,255,.32)_inset,0_-2px_4px_rgba(0,0,0,.3)_inset]" />
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="engraved font-display text-[clamp(20px,3vw,38px)] font-bold tracking-[.24em]">AN PHUNG</span>
                <span className="engraved font-mono text-[clamp(9px,1vw,12px)] tracking-[.3em] uppercase">
                  portfolio · est. 2026
                </span>
              </div>
            </div>

            {/* inner face: velvet lining + draggable polaroid + note */}
            <div className="metal-lid-back absolute inset-0 rounded-[30px] [backface-visibility:hidden] [transform:rotateX(180deg)] shadow-[0_-3px_0_rgba(255,255,255,.35)_inset,0_8px_20px_rgba(0,0,0,.45)_inset]">
              <div
                ref={lidTray}
                id="about"
                className="velvet absolute inset-5 overflow-hidden rounded-[14px] shadow-[0_-2px_5px_rgba(255,255,255,.2)_inset,0_6px_14px_rgba(0,0,0,.5)_inset]"
                style={{ visibility: open ? "visible" : "hidden" }}
              >
                {/* about me collage — upper right of polaroid */}
                <div
                  className={`absolute flex w-[44%] flex-col gap-[3px] bg-gradient-to-b from-[rgba(20,18,22,.86)] to-[rgba(20,18,22,.68)] px-2 py-1.5 shadow-[0_5px_14px_rgba(0,0,0,.6)]`}
                  style={{ left: "50%", top: "12%" }}
                >
                  <Ransom words={collageWords} base={7} />
                </div>

                {/* draggable polaroid */}
                <div
                  data-draggable
                  className="absolute w-[36%] bg-gradient-to-b from-[#fbfaf6] to-[#eceade] px-1 pt-1 pb-3.5 shadow-[0_8px_18px_rgba(0,0,0,.55)] select-none"
                  style={{ left: `${polaroid.x}%`, top: `${polaroid.y}%`, transform: "rotate(-2.4deg)" }}
                >
                  <span onPointerDown={dragPolaroid} className={`absolute -top-[7px] -left-[9%] h-[15px] w-[34%] rotate-[-7deg] bg-[rgba(238,232,214,.5)] shadow-[0_1px_3px_rgba(0,0,0,.35)] ${grab}`} />
                  <span onPointerDown={dragPolaroid} className={`absolute -top-[7px] -right-[9%] h-[15px] w-[34%] rotate-[6deg] bg-[rgba(238,232,214,.5)] shadow-[0_1px_3px_rgba(0,0,0,.35)] ${grab}`} />
                  <div className="relative aspect-square w-full bg-[#151517] shadow-[0_1px_3px_rgba(0,0,0,.5)_inset]">
                    <div className="h-full w-full flex items-center justify-center font-mono text-[8px] tracking-[.12em] text-[#4a4a4a] uppercase">portrait</div>
                  </div>
                  <span onPointerDown={dragPolaroid} className={`block h-3 ${grab}`} />
                </div>

                {/* crumpled receipt note — right */}
                <div
                  className="absolute flex flex-col gap-[5px] shadow-[2px_4px_12px_rgba(0,0,0,.45),-1px_-1px_4px_rgba(0,0,0,.2)]"
                  style={{
                    right: "4%", top: "33%", width: "50%",
                    background: "linear-gradient(168deg,#f6f3ea 0%,#ede8d8 40%,#e8e3d2 60%,#f0ebd9 100%)",
                    transform: "rotate(1.8deg) skewY(-0.4deg)",
                    padding: "6% 7%",
                    clipPath: "polygon(0% 0.8%, 99.5% 0%, 100% 99%, 0.5% 100%)",
                  }}
                >
                  {/* wrinkle lines */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: "repeating-linear-gradient(175deg, transparent 0px, transparent 18px, rgba(0,0,0,.03) 18px, rgba(0,0,0,.03) 19px), linear-gradient(92deg, transparent 60%, rgba(0,0,0,.04) 62%, transparent 64%)",
                  }} />
                  {/* fold shadow top-left corner */}
                  <div className="absolute top-0 left-0 w-[18%] h-[22%]" style={{
                    background: "linear-gradient(135deg, rgba(0,0,0,.07) 0%, transparent 70%)",
                  }} />
                  <p className="relative m-0 font-display font-semibold text-[#231f1e]" style={{ fontSize: "clamp(7px,1.4vw,11px)", letterSpacing: ".06em" }}>An Phung</p>
                  <p className="relative m-0 font-mono text-[#5a5040] uppercase" style={{ fontSize: "clamp(4px,.8vw,6px)", letterSpacing: ".16em" }}>CS @ UBC · Software Engineer</p>
                  <div className="relative my-[3px] h-px bg-[rgba(0,0,0,.12)]" />
                  <p className="relative m-0 font-body text-[#3d3628] leading-relaxed text-pretty" style={{ fontSize: "clamp(5px,1vw,8px)" }}>
                    No text yet — replace this with your introduction: what you do, what you care about, what you are looking for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={toggle}
          className="animate-breathe cursor-pointer border-0 bg-transparent p-0 font-mono text-xs tracking-[.28em] text-[#8b8f98] uppercase"
        >
          {open ? "scroll down ↓" : "tap to open the tin"}
        </button>
        {open && (
          <p className="m-0 font-mono text-[10px] tracking-[.26em] text-paper-500 uppercase">
            tap the image or the words inside
          </p>
        )}
      </div>
    </section>
  );
}
