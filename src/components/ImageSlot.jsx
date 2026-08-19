/**
 * Static image display. Renders defaultSrc, or a placeholder label if none set.
 */
export default function ImageSlot({ placeholder = "image", className = "", defaultSrc = null, imgPosition = "50% 50%" }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {defaultSrc ? (
        <img
          src={defaultSrc}
          alt=""
          className="h-full w-full object-cover grayscale contrast-105"
          style={{ objectPosition: imgPosition }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black/45 text-center font-mono text-[9px] tracking-[.16em] text-paper-500 uppercase">
          {placeholder}
        </div>
      )}
    </div>
  );
}
