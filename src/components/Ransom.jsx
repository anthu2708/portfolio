import { ransom } from "../lib/ransom.js";

/** Cut-and-paste lettering. `words` lines are separated by "/". */
export default function Ransom({ words, base = 13, className = "" }) {
  return (
    <>
      {ransom(words, base).map((line, i) => (
        <div key={i} className={`flex items-baseline gap-[2px] ${className}`}>
          {line.letters.map((l, j) => (
            <span
              key={j}
              className="inline-block px-[3px] py-px leading-[1.05] text-[#191818] shadow-[0_1px_2px_rgba(0,0,0,.45)]"
              style={{
                background: l.bg,
                fontFamily: l.font,
                fontSize: `${l.size}px`,
                transform: `rotate(${l.rot}deg)`,
              }}
            >
              {l.ch}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
