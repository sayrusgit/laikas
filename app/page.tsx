'use client';

import Controls from '@/components/controls';
import TimeOptions from '@/components/time-options';
import { useCurrentSound } from '@/lib/hooks/use-current-sound';
import { useCurrentVolume } from '@/lib/hooks/use-current-volume';
import { useSoundRepeats } from '@/lib/hooks/use-sound-repeats';
import useTimer from '@/lib/hooks/use-timer';
import useTimerData from '@/lib/hooks/use-timer-data';
import { playAudio } from '@/lib/lib';
import { cn } from '@/lib/utils';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { CircleHelp } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Home() {
  const [timerData, setTime, time] = useTimerData();
  const [timer, state, isTargetAchieved] = useTimer(timerData);

  const [currentSound] = useCurrentSound();
  const [currentVolume] = useCurrentVolume();
  const [repeats] = useSoundRepeats();

  useEffect(() => {
    timer.on('secondsUpdated', () => {
      document.title = `${timer.getTimeValues().toString()} | laikas`;
    });
    timer.on('paused', () => {
      document.title = 'paused | laikas';
    });

    return () => {
      document.title = 'laikas';
    };
  }, [timer]);

  useEffect(() => {
    if (isTargetAchieved) playAudio(currentSound, currentVolume, repeats);
  }, [isTargetAchieved]);

  const startTimer = () => {
    timer.start();
  };

  const pauseTimer = () => {
    timer.pause();
  };

  return (
    <div className="xs:gap-15 flex h-[calc(100vh-225px)] flex-col items-center justify-center gap-9">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center gap-3 transition-transform duration-700">
          <NumberFlowGroup>
            <div
              className={cn(
                'flex items-baseline text-6xl font-medium transition-transform duration-700 ease-in-out',
                {
                  'scale-100': !timer.isPaused(),
                  'scale-80': timer.isPaused(),
                },
              )}
            >
              <NumberFlow
                trend={-1}
                value={timer.getTimeValues().hours}
                format={{ minimumIntegerDigits: 2 }}
              />
              <NumberFlow
                prefix=":"
                trend={-1}
                value={timer.getTimeValues().minutes}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
                willChange
              />
              <NumberFlow
                prefix=":"
                trend={-1}
                value={timer.getTimeValues().seconds}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
                willChange
              />
            </div>
          </NumberFlowGroup>
          <TimeOptions time={time} setTime={setTime} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <Controls
          isRunning={timer.isRunning()}
          isPaused={timer.isPaused()}
          isTriggered={state.isTriggered}
          time={time}
          setTime={setTime}
          pauseTimer={pauseTimer}
          startTimer={startTimer}
        />
        <Link href="help">
          <div className="text-muted-foreground flex items-center gap-2">
            <CircleHelp className="h-4 w-4" />
            <p>help</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
