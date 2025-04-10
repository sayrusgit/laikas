import type { Precision, TimerValues } from 'easytimer.js';
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';

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
  const timerData = useMemo<ITimerConfig>(() => {
    return {
      startValues: { seconds: time },
      countdown: true,
      updateWhenTargetAchieved: true,
    };
  }, [time]);

  return [timerData, setTime, time];
};

export default useTimerData;
