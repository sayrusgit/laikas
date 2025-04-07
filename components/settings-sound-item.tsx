import React, { Dispatch, SetStateAction } from 'react';
import { Play } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Props {
  playAudio: (filename: string) => void;
  title: string;
  filename: string;
  currentSound: string | null;
  setCurrentSound: Dispatch<SetStateAction<string | null>>;
}

function SettingsSoundItem({ playAudio, title, filename, currentSound, setCurrentSound }: Props) {
  const isCurrent = currentSound === filename;

  const handleClick = () => {
    if (isCurrent) return;

    setCurrentSound(filename);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <p>{title}</p>
        <Play
          className="size-3.5 cursor-pointer transition-all ease-in-out hover:size-4"
          onClick={() => playAudio(filename)}
        />
      </div>
      <Checkbox
        id={filename}
        className={cn('h-4.5 w-4.5', { 'cursor-pointer': !isCurrent })}
        checked={isCurrent}
        onClick={handleClick}
      />
    </div>
  );
}

export default SettingsSoundItem;
