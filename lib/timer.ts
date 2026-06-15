import { useEffect, useMemo, useRef, useState } from 'react';
import type { TimerControls, TimerData, TimerTime } from '@/lib/timer-types';
import type { WorkerMessage } from '@/lib/timer-worker';

export default function useTimer(): [TimerTime, TimerData, TimerControls] {
  const workerRef = useRef<Worker | null>(null);
  const timeLeftRef = useRef(0);
  const initialTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  timeLeftRef.current = timeLeft;
  initialTimeRef.current = initialTime;

  useEffect(() => {
    const onVisibilityChange = () => {
      const visible = document.visibilityState === 'visible';
      isVisibleRef.current = visible;

      if (visible) {
        setTimeLeft(timeLeftRef.current);
      }
    };

    isVisibleRef.current = document.visibilityState === 'visible';
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    workerRef.current = new Worker(new URL('timer-worker.ts', import.meta.url));

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { timeLeft: newTimeLeft, finished } = e.data;

      if (finished) {
        timeLeftRef.current = 0;
        setTimeLeft(0);
        setIsRunning(false);
        setIsFinished(true);
      } else {
        timeLeftRef.current = newTimeLeft;

        if (isVisibleRef.current) {
          setTimeLeft((prev) => (prev !== newTimeLeft ? newTimeLeft : prev));
        }
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ action: 'stop' });
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const time = useMemo(
    () => ({
      hrs: Math.floor(timeLeft / 3600),
      mins: Math.floor((timeLeft % 3600) / 60),
      secs: timeLeft % 60,
    }),
    [timeLeft],
  );

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
        const currentTimeLeft = timeLeftRef.current;
        const currentInitialTime = initialTimeRef.current;

        if (currentTimeLeft > 0) {
          // resume existing timer
          setIsRunning(true);
          setIsPaused(false);
          setIsFinished(false);

          const message: WorkerMessage = {
            action: 'start',
            duration: currentTimeLeft * 1000,
          };

          workerRef?.current?.postMessage(message);
        } else if (currentInitialTime > 0) {
          // start new timer
          timeLeftRef.current = currentInitialTime;
          setTimeLeft(currentInitialTime);
          setIsRunning(true);
          setIsPaused(false);
          setIsFinished(false);

          const message: WorkerMessage = {
            action: 'start',
            duration: currentInitialTime * 1000,
          };

          workerRef?.current?.postMessage(message);
        }
      },
      pause: () => {
        workerRef?.current?.postMessage({ action: 'stop' });
        setIsRunning(false);
        setIsPaused(true);
      },
      stop: () => {
        workerRef?.current?.postMessage({ action: 'stop' });
        timeLeftRef.current = 0;
        initialTimeRef.current = 0;
        setTimeLeft(0);
        setInitialTime(0);
        setIsRunning(false);
        setIsPaused(false);
        setIsFinished(false);
      },
      set: (secs: number) => {
        timeLeftRef.current = secs;
        initialTimeRef.current = secs;
        setInitialTime(secs);
        setTimeLeft(secs);
      },
    };
  }, []);

  return [time, data, controls];
}
