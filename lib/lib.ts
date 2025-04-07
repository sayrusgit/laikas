export function playAudio(
  sound: string | null,
  volume: number | null,
  repeats?: number | null,
): void {
  const audio = new Audio(`/audio/${sound}`);
  audio.volume = volume !== null ? volume : 0.5;
  audio.play();

  let count = 1;

  audio.addEventListener('ended', () => {
    if (repeats && count < repeats) {
      audio.play();
      count++;
    }
  });
}
