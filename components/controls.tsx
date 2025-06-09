import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw, Settings, StepForward, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { type SetStateAction, useCallback, useEffect } from 'react';

interface Props {
  time: number;
  set: (secs: number) => void;
  isRunning: boolean;
  isPaused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  stop: () => void;
}

function Controls({ isRunning, isPaused, startTimer, pauseTimer, time, set, stop }: Props) {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') startTimer();
      if (e.key === ' ' && !isPaused) pauseTimer();
      if (e.key === ' ' && isPaused) startTimer();
      if (e.key === 'Backspace' && !isRunning && !isPaused) set(0);
      if (e.key === 'Backspace' && isPaused) stop();
      if (e.key === '/') router.push('/settings');
      if (e.key === 'h') router.push('/help');
    },
    [startTimer, pauseTimer, isPaused, set],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="flex items-center justify-center gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
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
        <Button onClick={() => pauseTimer()} size="lg">
          <Pause />
          Pause
        </Button>
      )}
      {isRunning ||
        (isPaused && (
          <Button onClick={() => stop()} size="lg">
            <X />
            Cancel
          </Button>
        ))}
      {!isRunning && !isPaused && (
        <Button onClick={() => set(0)} size="lg" disabled={!time}>
          <RotateCcw />
          Reset
        </Button>
      )}
      <motion.span whileTap={{ scale: 0.9 }}>
        <Link href="/settings" title="Settings">
          <Button size="icon">
            <Settings />
          </Button>
        </Link>
      </motion.span>
    </motion.div>
  );
}

export default React.memo(Controls);
