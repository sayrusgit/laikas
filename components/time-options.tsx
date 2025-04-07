import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface Props {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

function TimeOptions({ time, setTime }: Props) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.shiftKey && e.code === 'KeyZ') setTime(time + 300);
    if (e.shiftKey && e.code === 'KeyX') setTime(time + 600);
    if (e.shiftKey && e.code === 'KeyC') setTime(time + 1200);
    if (e.shiftKey && e.code === 'KeyV') setTime(time + 3600);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [time]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, s: number) => {
    if (e.ctrlKey && time > 0) setTime(s > time ? time - time : time - s);
    if (!e.ctrlKey) setTime(time + s);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {process.env.NODE_ENV === 'development' && (
        <Button className="h-6" onClick={(e) => handleClick(e, 1)} variant="outline">
          0:01
        </Button>
      )}
      <Button className="h-6" onClick={(e) => handleClick(e, 300)} variant="outline">
        5:00
      </Button>
      <Button className="h-6" onClick={(e) => handleClick(e, 600)} variant="outline">
        10:00
      </Button>
      <Button className="h-6" onClick={(e) => handleClick(e, 1200)} variant="outline">
        20:00
      </Button>
      <Button className="h-6" onClick={(e) => handleClick(e, 3600)} variant="outline">
        60:00
      </Button>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Info className="text-muted-foreground h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent align="start">
            <p>Press Ctrl to decrease time</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default React.memo(TimeOptions);
