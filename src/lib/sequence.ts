export const FRAME_COUNT = 75;

export function getFramePath(index: number): string {
  const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, index));
  const padded = String(clamped).padStart(2, "0");
  return `/sequence/frame_${padded}_delay-0.067s.png`;
}

export function preloadFrames(): Promise<HTMLImageElement[]> {
  const promises = Array.from({ length: FRAME_COUNT }, (_, i) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = getFramePath(i);
    });
  });
  return Promise.all(promises);
}
