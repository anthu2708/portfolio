import { useEffect, useRef, useState } from "react";

/**
 * Drag-and-drop (or click-to-browse) image placeholder.
 * The chosen image is stored as a data URL in localStorage under `id`.
 */
export default function ImageSlot({ id, placeholder = "drop an image", className = "", defaultSrc = null, imgPosition = "20% 20%" }) {
  const [src, setSrc] = useState(defaultSrc);
  const [over, setOver] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`slot:${id}`);
      setSrc(saved || defaultSrc);
    } catch {
      setSrc(defaultSrc);
    }
  }, [id, defaultSrc]);

  const take = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result);
      try {
        localStorage.setItem(`slot:${id}`, reader.result);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        take(e.dataTransfer.files?.[0]);
      }}
      onClick={() => input.current?.click()}
      className={`relative h-full w-full cursor-pointer overflow-hidden ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover grayscale contrast-105"
          style={{ objectPosition: imgPosition }}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-black/45 text-center font-mono text-[9px] tracking-[.16em] uppercase ${
            over ? "text-paper-100" : "text-paper-500"
          }`}
        >
          {placeholder}
        </div>
      )}
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => take(e.target.files?.[0])}
      />
    </div>
  );
}
