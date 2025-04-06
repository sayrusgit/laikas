import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Precision, TimerValues } from 'easytimer.js';

interface ITimerConfig {
  startValues?: TimerValues;
  target?: TimerValues;
  precision?: Precision;
  countdown?: boolean;
  updateWhenTargetAchieved?: boolean;
}

type TimerHookReturn = [ITimerConfig, Dispatch<SetStateAction<number>>, number];

const useTimerData = (): TimerHookReturn => {
  const [time, setTime] = useState<number>(0);
  const [timerData, setTimerData] = useState<ITimerConfig>({
    startValues: { seconds: time },
    countdown: true,
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    setTimerData({
      ...timerData,
      startValues: { seconds: time },
    });
  }, [time]);

  return [timerData, setTime, time];
};

export default useTimerData;
