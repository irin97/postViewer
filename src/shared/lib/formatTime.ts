export function formatTime(start: number, now: number): string {
  const totalTime = Math.max(0, Math.floor((now - start) / 1000));

  const sec = totalTime % 60;
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
