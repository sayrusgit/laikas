import { Button } from '@/components/ui/button';
import React, { useCallback, useEffect } from 'react';

interface Props {
  time: number;
  setTime: (secs: number) => void;
  isRunning: boolean;
}

function TimeOptions({ time, setTime, isRunning }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || isRunning) return;

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
    [time, setTime, isRunning],
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
    <div className="xs:flex-row flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-4">
        {process.env.NODE_ENV === 'development' && (
          <Button
            className="h-6"
            onClick={(e) => handleClick(e, 1)}
            variant="outline"
            disabled={isRunning}
          >
            1s
          </Button>
        )}
        <Button
          className="h-6"
          onClick={(e) => handleClick(e, 15)}
          variant="outline"
          disabled={isRunning}
        >
          15s
        </Button>
        <Button
          className="h-6"
          onClick={(e) => handleClick(e, 300)}
          variant="outline"
          disabled={isRunning}
        >
          5m
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className="h-6"
          onClick={(e) => handleClick(e, 600)}
          variant="outline"
          disabled={isRunning}
        >
          10m
        </Button>
        <Button
          className="h-6"
          onClick={(e) => handleClick(e, 1200)}
          variant="outline"
          disabled={isRunning}
        >
          20m
        </Button>
        <Button
          className="h-6"
          onClick={(e) => handleClick(e, 3600)}
          variant="outline"
          disabled={isRunning}
        >
          60m
        </Button>
      </div>
    </div>
  );
}

export default React.memo(TimeOptions);
