import type { TimerControls, TimerData, TimerTime } from '@/lib/timer-types';
import type { WorkerMessage } from '@/lib/timer-worker';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useTimer(): [TimerTime, TimerData, TimerControls] {
  const workerRef = useRef<Worker | null>(null);
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(new URL('timer-worker.ts', import.meta.url));

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { timeLeft: newTimeLeft, finished } = e.data;

      if (finished) {
        setTimeLeft(0);
        setIsRunning(false);
        setIsFinished(true);
      } else {
        setTimeLeft(newTimeLeft);
      }
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const time = {
    hrs: Math.floor(timeLeft / 3600),
    mins: Math.floor((timeLeft % 3600) / 60),
    secs: timeLeft % 60,
  };

  const data: TimerData = useMemo(() => {
    return {
      initialTime,
      isFinished,
      isRunning,
      isPaused,
    };
  }, [initialTime, isFinished, isRunning, isPaused]);

  const controls: TimerControls = useMemo(() => {
    return {
      start: () => {
        if (timeLeft > 0) {
          // resume existing timer
          setIsRunning(true);
          setIsPaused(false);
          setIsFinished(false);

          const message: WorkerMessage = {
            action: 'start',
            duration: timeLeft * 1000,
          };

          workerRef?.current?.postMessage(message);
        } else {
          // start new timer
          if (initialTime > 0) {
            setTimeLeft(initialTime);
            setIsRunning(true);
            setIsPaused(false);
            setIsFinished(false);

            const message: WorkerMessage = {
              action: 'start',
              duration: initialTime * 1000,
            };

            workerRef?.current?.postMessage(message);
          }
        }
      },
      pause: () => {
        workerRef?.current?.postMessage({ action: 'stop' });
        setIsRunning(false);
        setIsPaused(true);
      },
      stop: () => {
        workerRef?.current?.postMessage({ action: 'stop' });
        setTimeLeft(0);
        setInitialTime(0);
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(false);
      },
      set: (secs: number) => {
        setInitialTime(secs);
        setTimeLeft(secs);
      },
    };
  }, [workerRef, initialTime, isPaused]);

  return [time, data, controls];
}
