'use client';

import Controls from '@/components/controls';
import TimeOptions from '@/components/time-options';
import { useCurrentSound } from '@/lib/hooks/use-current-sound';
import { useCurrentVolume } from '@/lib/hooks/use-current-volume';
import { useSoundRepeats } from '@/lib/hooks/use-sound-repeats';
import { playAudio } from '@/lib/lib';
import useTimer from '@/lib/timer';
import { cn } from '@/lib/utils';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { CircleHelp } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Home() {
  const [time, data, controls] = useTimer();

  const [currentSound] = useCurrentSound();
  const [currentVolume] = useCurrentVolume();
  const [repeats] = useSoundRepeats();

  useEffect(() => {
    if (data.isFinished) playAudio(currentSound, currentVolume, repeats);
  }, [data.isFinished]);

  return (
    <div className="xs:gap-15 flex h-[calc(100vh-225px)] flex-col items-center justify-center gap-9">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center gap-3 transition-transform duration-700">
          <NumberFlowGroup>
            <div
              className={cn(
                'flex items-baseline text-6xl font-medium transition-transform duration-700 ease-in-out',
                {
                  'scale-100': !data.isPaused,
                  'scale-80': data.isPaused,
                },
              )}
            >
              <NumberFlow trend={-1} value={time.hrs} format={{ minimumIntegerDigits: 2 }} />
              <NumberFlow
                prefix=":"
                trend={-1}
                value={time.mins}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
                willChange
              />
              <NumberFlow
                prefix=":"
                trend={-1}
                value={time.secs}
                digits={{ 1: { max: 5 } }}
                format={{ minimumIntegerDigits: 2 }}
                willChange
              />
            </div>
          </NumberFlowGroup>
          <TimeOptions time={data.initialTime} setTime={controls.set} isRunning={data.isRunning} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <Controls
          isRunning={data.isRunning}
          isPaused={data.isPaused}
          time={data.initialTime}
          set={controls.set}
          startTimer={controls.start}
          pauseTimer={controls.pause}
          stop={controls.stop}
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
