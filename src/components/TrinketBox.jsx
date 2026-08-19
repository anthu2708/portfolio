import { useCallback, useRef, useState } from "react";
import ImageSlot from "./ImageSlot.jsx";
import Ransom from "./Ransom.jsx";
import { createDrag } from "../lib/drag.js";
import fraudImg from "../assets/fraud_detection.png";
import ragImg from "../assets/RagNote.png";
import safeImg from "../assets/SafeNest.png";

const PROJECT_CARDS = [
  { src: safeImg, label: "SafeNest", rotate: "-6deg", tx: "-6px", ty: "4px" },
  { src: ragImg, label: "RagNote", rotate: "3deg", tx: "4px", ty: "2px" },
  { src: fraudImg, label: "FraudDet.", rotate: "0deg", tx: "0px", ty: "0px" },
];

const POS_KEY = "an-phung-tin-positions-v2";
const DEFAULT_POS = {
  about: { x: 2, y: 3 },
  cv: { x: 2, y: 62 },
  contact: { x: 49, y: 5 },
  ring: { x: 49, y: 21 },
  lighter: { x: 74, y: 21 },
  projects: { x: 49, y: 76 },
};
const POLAROID_HOME = { x: 5, y: 4 };

function loadPos() {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (raw) return { ...DEFAULT_POS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_POS;
}

/** Closed tin → tap the lid → the lid flips up and the objects inside become the navigation. */
export default function TrinketBox({ collageWords = "about me / an phung / designer" }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(loadPos);
  const [polaroid, setPolaroid] = useState(POLAROID_HOME);
  const [lifted, setLifted] = useState(null);
  const tray = useRef(null);
  const lidTray = useRef(null);

  const toggle = () => {
    setOpen((o) => !o);
    setPolaroid(POLAROID_HOME);
    setLifted(null);
  };

  const savePos = useCallback((next) => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const item = (id, href) => ({
    "data-draggable": true,
    onPointerDown: createDrag({
      containerRef: tray,
      onLift: () => setLifted(id),
      onMove: (p) => setPos((s) => ({ ...s, [id]: p })),
      onEnd: () => setPos((s) => (savePos(s), s)),
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
            >
              {/* about me collage card */}
              <div
                {...item("about", "#about")}
                className={`absolute flex w-[44%] flex-col gap-[3px] bg-gradient-to-b from-[rgba(20,18,22,.86)] to-[rgba(20,18,22,.68)] px-2 py-1.5 shadow-[0_5px_14px_rgba(0,0,0,.6)] ${grab}`}
              >
                <Ransom words={collageWords} base={7} />
              </div>

              {/* cv receipt */}
              <div
                {...item("cv", "#cv")}
                className={`receipt-edge absolute flex w-[24%] flex-col gap-[3px] bg-gradient-to-b from-[#f6f3ea] to-[#e7e2d5] px-1.5 pt-[5px] pb-2.5 text-[#231f1e] shadow-[0_5px_14px_rgba(0,0,0,.55)] ${grab}`}
              >
                <span className="text-center font-mono text-[6px] tracking-[.16em] uppercase">curriculum vitae</span>
                <span className="block h-px bg-[repeating-linear-gradient(90deg,#231f1e_0_2px,transparent_2px_4px)]" />
                <span className="flex justify-between font-mono text-[6px]">
                  <span>an phung</span>
                  <span>pdf</span>
                </span>
                <span className="text-center font-mono text-[6px] tracking-[.18em] uppercase">tap to open</span>
              </div>

              {/* contact + projects word clusters */}
              {/* mini visit card */}
              {(() => {
                const contactItem = item("contact", "#contact");
                return (
                  <div
                    {...contactItem}
                    className={`absolute w-[30%] ${grab}`}
                  >
                    <div className="relative metal-plaque rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,.6)]" style={{ aspectRatio: "1.75 / 1" }}>
                      <div className="absolute inset-[4px] rounded-[2px] border border-white/20 flex flex-col justify-between px-[6px] py-[5px] shadow-[0_1px_0_rgba(255,255,255,.35)_inset]">
                        <div>
                          <p className="m-0 engraved font-display font-semibold tracking-[.12em] uppercase" style={{ fontSize: "clamp(4px,1.2vw,7px)" }}>An Phung</p>
                          <p className="m-0 font-mono text-[#75787e] tracking-[.14em] uppercase" style={{ fontSize: "clamp(3px,.7vw,5px)" }}>Software Engineer</p>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-[rgba(255,255,255,.15)] to-transparent" />
                          <p className="m-0 font-mono text-[#82858b] tracking-[.06em]" style={{ fontSize: "clamp(3px,.65vw,5px)" }}>phungtranthuan2005@gmail.com </p>
                          <p className="m-0 font-mono text-[#82858b] tracking-[.06em]" style={{ fontSize: "clamp(3px,.65vw,5px)" }}>linkedin.com/in/anthu2708 </p>
                          <p className="m-0 font-mono text-[#82858b] tracking-[.06em]" style={{ fontSize: "clamp(3px,.65vw,5px)" }}>github.com/anthu2708 </p>
                          <p className="m-0 font-mono text-[#82858b] tracking-[.06em]" style={{ fontSize: "clamp(3px,.65vw,5px)" }}>"+16725582708" </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              {/* stacked project cards tied with twine */}
              {(() => {
                const projectItem = item("projects", "#projects");
                return (
                  <div {...projectItem} className={`absolute w-[28%] ${grab}`} style={{ ...projectItem.style, aspectRatio: "3/4" }}>
                    {PROJECT_CARDS.map((card, i) => (
                      <div
                        key={card.label}
                        className="absolute inset-0 overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,.7)]"
                        style={{ transform: `rotate(${card.rotate}) translate(${card.tx}, ${card.ty})`, zIndex: i }}
                      >
                        <img src={card.src} alt={card.label} className="h-full w-full object-cover" draggable={false} />
                      </div>
                    ))}

                    {/* string */}
                    <div
                      className="absolute left-0 right-0 pointer-events-none"
                      style={{ top: "54%", zIndex: 10, height: "2px", background: "#111", boxShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                    />
                  </div>
                );
              })()}

              {/* trinkets: metal grab bar on top, droppable photo below */}
              {[
                { id: "ring", label: "ring" },
                { id: "lighter", label: "lighter" },
              ].map((t) => {
                const props = item(t.id, null);
                return (
                  <div
                    key={t.id}
                    data-draggable
                    style={props.style}
                    className="absolute flex w-[24%] flex-col items-center gap-1 select-none"
                  >
                    <span
                      onPointerDown={props.onPointerDown}
                      className={`metal-strip block h-2.5 w-full shadow-[0_1px_0_rgba(255,255,255,.4)_inset,0_2px_5px_rgba(0,0,0,.5)] ${grab}`}
                    />
                    <span className="relative block aspect-square w-full shadow-[0_4px_10px_rgba(0,0,0,.6)]">
                      <ImageSlot id={`trinket-${t.id}`} placeholder={t.label} />
                    </span>
                  </div>
                );
              })}
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
                {/* draggable polaroid */}
                <div
                  data-draggable
                  className="absolute w-[36%] bg-gradient-to-b from-[#fbfaf6] to-[#eceade] px-1 pt-1 pb-3.5 shadow-[0_8px_18px_rgba(0,0,0,.55)] select-none"
                  style={{ left: `${polaroid.x}%`, top: `${polaroid.y}%`, transform: "rotate(-2.4deg)" }}
                >
                  <span onPointerDown={dragPolaroid} className={`absolute -top-[7px] -left-[9%] h-[15px] w-[34%] rotate-[-7deg] bg-[rgba(238,232,214,.5)] shadow-[0_1px_3px_rgba(0,0,0,.35)] ${grab}`} />
                  <span onPointerDown={dragPolaroid} className={`absolute -top-[7px] -right-[9%] h-[15px] w-[34%] rotate-[6deg] bg-[rgba(238,232,214,.5)] shadow-[0_1px_3px_rgba(0,0,0,.35)] ${grab}`} />
                  <div className="relative aspect-square w-full bg-[#151517] shadow-[0_1px_3px_rgba(0,0,0,.5)_inset]">
                    <ImageSlot id="lid-polaroid" placeholder="portrait" />
                  </div>
                  <span onPointerDown={dragPolaroid} className={`block h-3 ${grab}`} />
                </div>

                {/* crumpled receipt note — right */}
                <div
                  className="absolute flex flex-col gap-[5px] shadow-[2px_4px_12px_rgba(0,0,0,.45),-1px_-1px_4px_rgba(0,0,0,.2)]"
                  style={{
                    right: "4%", top: "6%", width: "50%",
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
