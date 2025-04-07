import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw, Settings, StepForward, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { type Dispatch, type SetStateAction, useCallback, useEffect } from 'react';

interface Props {
  isRunning: boolean;
  isPaused: boolean;
  isTriggered: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

function Controls({
  isRunning,
  isPaused,
  isTriggered,
  startTimer,
  pauseTimer,
  time,
  setTime,
}: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') startTimer();
      if (e.key === ' ' && !isPaused && isTriggered) pauseTimer();
      if (e.key === ' ' && isPaused && isTriggered) startTimer();
      if (e.key === 'Backspace') setTime(0);
    },
    [startTimer, pauseTimer, isPaused, setTime, isTriggered],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="flex justify-center gap-5"
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
      <motion.span whileTap={{ scale: 0.9 }}>
        <Link href="/settings">
          <Button size="icon">
            <Settings />
          </Button>
        </Link>
      </motion.span>
    </motion.div>
  );
}

export default Controls;
