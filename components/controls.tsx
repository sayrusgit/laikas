import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Pause, Play, RotateCcw, Settings, StepForward, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function Controls({
  isRunning,
  isPaused,
  startTimer,
  pauseTimer,
  stopTimer,
  time,
  setTime,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') startTimer();
    if (e.key === ' ' && !isPaused) pauseTimer();
    if (e.key === ' ' && isPaused) startTimer();
    if (e.key === 'Backspace') setTime(0);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startTimer, pauseTimer, isPaused, time]);

  return (
    <div className="flex justify-center gap-5">
      {!isRunning && !isPaused && (
        <Button onClick={() => startTimer()} size="lg" disabled={!time}>
          <Play />
          Start
        </Button>
      )}
      {isPaused && (
        <Button onClick={() => startTimer()} size="lg">
          <StepForward />
          Continue
        </Button>
      )}
      {isRunning && !isPaused && (
        <Button onClick={() => pauseTimer()} className="cursor-pointer rounded-full" size="lg">
          <Pause />
          Pause
        </Button>
      )}
      {isRunning ||
        (isPaused && (
          <Button onClick={() => setTime(0)} size="lg">
            <X />
            Cancel
          </Button>
        ))}
      {!isRunning && !isPaused && (
        <Button onClick={() => setTime(0)} size="lg">
          <RotateCcw />
          Reset
        </Button>
      )}
      <Link href="/settings">
        <Button size="icon">
          <Settings />
        </Button>
      </Link>
    </div>
  );
}

export default Controls;
