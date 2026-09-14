// ── Decoding Effect ──────────────────────────────────────
// Rapidly cycles through random characters before settling
// on the final word — creates a "system boot" feeling.
const GLITCH_CHARS = "01!@#$%&?XYZABCDEF{}[]<>/\\|";

// Tracks the in-flight rAF loop per element without mutating the DOM
// node with a custom property (avoids `any` casts, auto-GC'd via WeakMap).
const decodeRafMap = new WeakMap<HTMLElement, number>();

export function decodeText(
  el: HTMLElement,
  finalText: string,
  duration = 0.8,
  targetOpacity = 0.18,
  onComplete?: () => void
) {
  // Cancel any existing decode animation on this element
  const existingRaf = decodeRafMap.get(el);
  if (existingRaf !== undefined) {
    cancelAnimationFrame(existingRaf);
  }

  const length = finalText.length;
  const durationMs = duration * 1000;
  const scrambleInterval = 80; // Slower, more deliberate character cycling
  let lastScrambleTime = 0;
  let startTime: number | null = null;

  // Make visible and set first scrambled frame SYNCHRONOUSLY
  el.style.opacity = String(targetOpacity);
  el.textContent = finalText
    .split("")
    .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
    .join("");

  function tick(timestamp: number) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / durationMs, 1);

    // Ease-out for smooth deceleration: characters lock in faster at the end
    const easedProgress = 1 - Math.pow(1 - progress, 2);
    const revealedCount = Math.floor(easedProgress * length);

    // Only update text content at the scramble interval to keep the glitch aesthetic
    if (timestamp - lastScrambleTime >= scrambleInterval || progress >= 1) {
      lastScrambleTime = timestamp;

      if (progress >= 1) {
        el.textContent = finalText;
        decodeRafMap.delete(el);
        onComplete?.();
        return;
      }

      el.textContent = finalText
        .split("")
        .map((char, i) => {
          if (i < revealedCount) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
    }

    const raf = requestAnimationFrame(tick);
    decodeRafMap.set(el, raf);
  }

  const raf = requestAnimationFrame(tick);
  decodeRafMap.set(el, raf);
  return () => {
    const currentRaf = decodeRafMap.get(el);
    if (currentRaf !== undefined) cancelAnimationFrame(currentRaf);
  };
}

// Custom event name for cross-component coordination
export const HERO_LEFT_COMPLETE = "hero:left-entrance-complete";
