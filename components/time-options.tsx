import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';

interface Props {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

function TimeOptions({ time, setTime }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === '1') setTime(time + 15);
      if (e.key === '2') setTime(time + 300);
      if (e.key === '3') setTime(time + 600);
      if (e.key === '4') setTime(time + 1200);
      if (e.key === '5') setTime(time + 3600);

      if (e.key === '!') setTime(15 > time ? time - time : time - 15);
      if (e.key === '@') setTime(300 > time ? time - time : time - 300);
      if (e.key === '#') setTime(600 > time ? time - time : time - 600);
      if (e.key === '$') setTime(1200 > time ? time - time : time - 1200);
      if (e.key === '%') setTime(3600 > time ? time - time : time - 3600);
    },
    [time, setTime],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, s: number) => {
    if (e.ctrlKey && time > 0) setTime(s > time ? time - time : time - s);
    if (!e.ctrlKey) setTime(time + s);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="flex items-center gap-4">
        <Button className="h-6" onClick={(e) => handleClick(e, 1)} variant="outline">
          0:15
        </Button>
        <Button className="h-6" onClick={(e) => handleClick(e, 300)} variant="outline">
          5:00
        </Button>
        <Button className="h-6" onClick={(e) => handleClick(e, 600)} variant="outline">
          10:00
        </Button>
      </div>
      <div className="flex items-center gap-4">
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
    </div>
  );
}

export default React.memo(TimeOptions);
