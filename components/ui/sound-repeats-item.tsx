import type React from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  value: number;
  repeats: number | null;
  setRepeats: React.Dispatch<React.SetStateAction<number | null>>;
}

function SoundRepeatsItem({ value, repeats, setRepeats }: Props) {
  if (value === repeats)
    return (
      <Button size="sm" onClick={() => setRepeats(value)}>
        {value}
      </Button>
    );

  return (
    <Button variant="ghost" size="sm" onClick={() => setRepeats(value)}>
      {value}
    </Button>
  );
}

export default SoundRepeatsItem;
