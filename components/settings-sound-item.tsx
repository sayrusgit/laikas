import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  handleAudio: (filename: string) => void;
  title: string;
  filename: string;
  currentSound: string | null;
  setCurrentSound: Dispatch<SetStateAction<string | null>>;
}

function SettingsSoundItem({ handleAudio, title, filename, currentSound, setCurrentSound }: Props) {
  const isCurrent = currentSound === filename;

  const handleClick = () => {
    if (isCurrent) return;

    setCurrentSound(filename);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <p>{title}</p>
        <button type="button" aria-label="Play sound" onClick={() => handleAudio(filename)}>
          <Play className="size-3.5 cursor-pointer" role="button" />
        </button>
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
