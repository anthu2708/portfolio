const FONTS = [
  '"Cinzel", serif',
  '"Courier Prime", monospace',
  '"Spectral", Georgia, serif',
  "Georgia, serif",
];
const PAPERS = ["#efece3", "#e6e2d6", "#f4f2ec", "#ded9cc"];

/** Cut-out newspaper lettering. `src` lines are separated by "/". */
export function ransom(src, base = 13) {
  let k = 0;
  return String(src)
    .split("/")
    .map((part) => ({
      letters: part
        .trim()
        .split("")
        .map((ch) => {
          k += 1;
          const h = (k * 2654435761) % 97;
          return {
            ch: ch === " " ? "\u00a0" : ch,
            rot: ((h % 13) - 6) * 0.9,
            font: FONTS[h % FONTS.length],
            size: base + (h % 3),
            bg: ch === " " ? "transparent" : PAPERS[(h >> 2) % PAPERS.length],
          };
        }),
    }));
}
