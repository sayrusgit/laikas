import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

type UseCurrentSoundReturn = [number | null, Dispatch<SetStateAction<number | null>>];

export const useCurrentVolume = (): UseCurrentSoundReturn => {
  const [currentVolume, setCurrentVolume] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('volume');
    if (stored !== null) setCurrentVolume(Number(stored));
    else localStorage.setItem('volume', '0.5');
  }, []);

  useEffect(() => {
    if (currentVolume !== null) localStorage.setItem('volume', String(currentVolume));
  }, [currentVolume]);

  return [currentVolume, setCurrentVolume];
};
