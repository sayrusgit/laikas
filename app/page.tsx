'use client';

import { Button } from '@/components/ui/button';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import useTimer from '@/lib/use-timer';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import useTimerData from '@/lib/use-timer-data';
import { useEffect } from 'react';

export default function Home() {
  const [timerData, setTime, time] = useTimerData();
  const [timer, isTargetAchieved] = useTimer(timerData);

  useEffect(() => {
    if (isTargetAchieved) playAudio();
  }, [isTargetAchieved]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, s: number) => {
    if (e.ctrlKey && time > 0) setTime(s > time ? time - time : time - s);
    if (!e.ctrlKey) setTime(time + s);
  };

  const playAudio = () => {
    const audio = new Audio('/audio/sound1.mp3');
    audio.volume = 0.4;
    audio.play();
  };

  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center gap-3">
          <NumberFlowGroup>
            <div className="flex items-baseline text-6xl font-medium">
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
          <div className="flex items-center justify-center gap-4">
            <Button
              className="h-6 cursor-pointer rounded-2xl"
              onClick={(e) => handleClick(e, 1)}
              variant="outline"
            >
              0:01
            </Button>
            <Button
              className="h-6 cursor-pointer rounded-2xl"
              onClick={(e) => handleClick(e, 300)}
              variant="outline"
            >
              5:00
            </Button>
            <Button
              className="h-6 cursor-pointer rounded-2xl"
              onClick={(e) => handleClick(e, 600)}
              variant="outline"
            >
              10:00
            </Button>
            <Button
              className="h-6 cursor-pointer rounded-2xl"
              onClick={(e) => handleClick(e, 1200)}
              variant="outline"
            >
              20:00
            </Button>
            <Button
              className="h-6 cursor-pointer rounded-2xl"
              onClick={(e) => handleClick(e, 3600)}
              variant="outline"
            >
              60:00
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-15 flex justify-center gap-5">
        <Button
          onClick={() => timer.start()}
          className="cursor-pointer rounded-full"
          size="lg"
        >
          <Play />
          Start
        </Button>
        {/*<Button
          onClick={() => timer.pause()}
          className="cursor-pointer rounded-full"
          size="lg"
        >
          <StepForward />
          Pause
        </Button>*/}
        {/*<Button
          onClick={() => timer.stop()}
          className="cursor-pointer rounded-full"
          size="lg"
        >
          <Pause />
          Stop
        </Button>*/}
        <Button
          onClick={() => setTime(0)}
          className="cursor-pointer rounded-full"
          size="lg"
        >
          <RotateCcw />
          Reset
        </Button>
      </div>
    </div>
  );
}
