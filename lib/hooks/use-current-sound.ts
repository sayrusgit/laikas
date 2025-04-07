import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseCurrentSoundReturn = [string | null, Dispatch<SetStateAction<string | null>>];

export const useCurrentSound = (): UseCurrentSoundReturn => {
  const [currentSound, setCurrentSound] = useState<string | null>(null);

  useEffect(() => {
    const _currentSound = localStorage.getItem('sound');
    if (!_currentSound) {
      localStorage.setItem('sound', 'xylophone1.mp3');
      setCurrentSound('xylophone1.mp3');
      return;
    }

    setCurrentSound(_currentSound);
  }, []);

  useEffect(() => {
    if (currentSound) localStorage.setItem('sound', currentSound);
  }, [currentSound]);

  return [currentSound, setCurrentSound];
};
