import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseCurrentSoundReturn = [number, Dispatch<SetStateAction<number>>];

export const useCurrentVolume = (): UseCurrentSoundReturn => {
  const [currentVolume, setCurrentVolume] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('volume');
      return stored !== null ? Number(stored) : 0.4;
    }

    return 0.4;
  });

  useEffect(() => {
    localStorage.setItem('volume', String(currentVolume));
  }, [currentVolume]);

  return [currentVolume, setCurrentVolume];
};
