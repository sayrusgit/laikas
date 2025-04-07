'use client';

import Controls from '@/components/controls';
import TimeOptions from '@/components/time-options';
import { useCurrentSound } from '@/lib/hooks/use-current-sound';
import { useCurrentVolume } from '@/lib/hooks/use-current-volume';
import useTimer from '@/lib/hooks/use-timer';
import useTimerData from '@/lib/hooks/use-timer-data';
import { cn } from '@/lib/utils';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [timerData, setTime, time] = useTimerData();
  const [timer, isTargetAchieved] = useTimer(timerData);
  const [currentSound] = useCurrentSound();
  const [currentVolume] = useCurrentVolume();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    timer.on('started', () => setIsTriggered(true));
    timer.on('secondsUpdated', () => {
      document.title = `${timer.getTimeValues().toString()} | laikas`;
    });
    timer.on('paused', () => {
      document.title = 'paused | laikas';
    });

    return () => {
      timer.removeAllEventListeners();
      setIsTriggered(false);
      document.title = 'laikas';
    };
  }, [timer]);

  useEffect(() => {
    if (isTargetAchieved) playAudio();
  }, [isTargetAchieved]);

  const playAudio = () => {
    const audio = new Audio(`/audio/${currentSound}`);
    audio.volume = currentVolume;
    audio.play();
  };

  const startTimer = () => {
    timer.start();
    setForceUpdate(!forceUpdate);
  };

  const pauseTimer = () => {
    timer.pause();
    setForceUpdate(!forceUpdate);
  };

  return (
    <div className="flex h-[calc(100vh-225px)] flex-col justify-center gap-15">
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
      <Controls
        isRunning={timer.isRunning()}
        isPaused={timer.isPaused()}
        isTriggered={isTriggered}
        time={time}
        setTime={setTime}
        pauseTimer={pauseTimer}
        startTimer={startTimer}
      />
    </div>
  );
}
