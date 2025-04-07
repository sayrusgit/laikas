import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Precision, TimerValues } from 'easytimer.js';

interface ITimerConfig {
  startValues?: TimerValues;
  target?: TimerValues;
  precision?: Precision;
  countdown?: boolean;
  updateWhenTargetAchieved?: boolean;
}

type TimerDataHookReturn = [ITimerConfig, Dispatch<SetStateAction<number>>, number];

const useTimerData = (): TimerDataHookReturn => {
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
