/**
 * Pointer drag inside a container, in % of the container box.
 * Plain factory (not a hook) so handlers can be built per item during render.
 * A pointerdown that never moves more than 4px counts as a click (`onClick`).
 */
export function createDrag({ containerRef, onMove, onLift, onClick, onEnd }) {
  return (e) => {
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    e.stopPropagation();

    const item = e.currentTarget.closest("[data-draggable]") || e.currentTarget;
    const cr = container.getBoundingClientRect();
    const ir = item.getBoundingClientRect();
    const offX = e.clientX - ir.left;
    const offY = e.clientY - ir.top;
    const maxX = Math.max(0, 100 - (ir.width / cr.width) * 100);
    const maxY = Math.max(0, 100 - (ir.height / cr.height) * 100);
    const clamp = (v, hi) => Math.max(0, Math.min(hi, v));
    let moved = false;

    const move = (ev) => {
      if (Math.abs(ev.clientX - e.clientX) + Math.abs(ev.clientY - e.clientY) > 4) moved = true;
      onMove({
        x: clamp(((ev.clientX - offX - cr.left) / cr.width) * 100, maxX),
        y: clamp(((ev.clientY - offY - cr.top) / cr.height) * 100, maxY),
      });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (onEnd) onEnd(moved);
      if (!moved && onClick) onClick();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    if (onLift) onLift();
  };
}
