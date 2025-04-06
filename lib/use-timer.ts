import { useState, useEffect } from 'react';
import { Precision, Timer, TimerEvent, TimerValues } from 'easytimer.js';

interface TimerHookConfig {
  startValues?: TimerValues;
  target?: TimerValues;
  precision?: Precision;
  countdown?: boolean;
  updateWhenTargetAchieved?: boolean;
}

type TimerHookReturn = [Timer, boolean];

const useTimer = ({
  startValues,
  target,
  precision,
  countdown,
  updateWhenTargetAchieved,
}: TimerHookConfig = {}): TimerHookReturn => {
  const unitsToSave = ['days', 'hours', 'minutes', 'seconds', 'secondTenths'];

  const [isTargetAchieved, setIsTargetAchieved] = useState(false);
  const [, setTimerValues] = useState<string>();
  const [timer, setTimer] = useState<Timer>(() => {
    return new Timer({
      startValues,
      target,
      precision,
      countdown,
      callback: (t) => {
        setTimerValues(t.getTimeValues().toString(unitsToSave));
      },
    });
  });

  useEffect(() => {
    const newTimer = new Timer({
      startValues,
      target,
      precision,
      countdown,
      callback: (t) => {
        setTimerValues(t.getTimeValues().toString(unitsToSave));
      },
    });

    const updateCallback = (e: TimerEvent) => {
      setTimerValues(e.detail.timer.getTimeValues().toString(unitsToSave));
    };

    const onTargetAchieved = () => setIsTargetAchieved(true);
    const onStarted = (e: TimerEvent) => {
      updateCallback(e);
      setIsTargetAchieved(false);
    };

    newTimer.on('started', onStarted);
    newTimer.on('reset', onStarted);

    if (updateWhenTargetAchieved) {
      newTimer.on('targetAchieved', onTargetAchieved);
    }

    setTimer(newTimer);

    return () => {
      newTimer.stop();
      newTimer.removeAllEventListeners();
    };
  }, [startValues, target, precision, countdown, updateWhenTargetAchieved]);

  return [timer, isTargetAchieved];
};

export default useTimer;
