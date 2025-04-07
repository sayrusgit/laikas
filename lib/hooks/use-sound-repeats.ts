import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

type useSoundRepeatsReturn = [number | null, Dispatch<SetStateAction<number | null>>];

export const useSoundRepeats = (): useSoundRepeatsReturn => {
  const [repeats, setRepeats] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('repeats');
    if (stored !== null) setRepeats(Number(stored));
    else localStorage.setItem('repeats', '1');
  }, []);

  useEffect(() => {
    if (repeats) localStorage.setItem('repeats', String(repeats));
  }, [repeats]);

  return [repeats, setRepeats];
};
