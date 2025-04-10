import { type Precision, Timer, type TimerEvent, type TimerValues } from 'easytimer.js';
import { useEffect, useState } from 'react';

interface TimerHookConfig {
  startValues?: TimerValues;
  target?: TimerValues;
  precision?: Precision;
  countdown?: boolean;
}

type TimerHookReturn = [
  Timer,
  { isTargetAchieved: boolean; isRunning: boolean; isPaused: boolean; isTriggered: boolean },
];

const UNITS_TO_SAVE = ['days', 'hours', 'minutes', 'seconds', 'secondTenths'];

const useTimer = ({
  startValues,
  target,
  precision,
  countdown,
}: TimerHookConfig = {}): TimerHookReturn => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isTargetAchieved, setIsTargetAchieved] = useState(false);

  const updateCallback = (timer: Timer) => {
    setTimerValues(timer.getTimeValues().toString(UNITS_TO_SAVE));
  };

  const [, setTimerValues] = useState<string>();
  const [timer, setTimer] = useState<Timer>(() => {
    return new Timer({
      startValues,
      target,
      precision,
      countdown,
      callback: updateCallback,
    });
  });

  useEffect(() => {
    const newTimer = new Timer({
      startValues,
      target,
      precision,
      countdown,
      callback: updateCallback,
    });

    const onStarted = (e: TimerEvent) => {
      updateCallback(e.detail.timer);

      setIsTargetAchieved(false);
      setIsRunning(timer.isRunning());
      setIsPaused(timer.isPaused());
      setIsTriggered(true);
    };

    const onPaused = () => {
      setIsRunning(false);
      setIsPaused(true);
    };

    const onStop = () => {
      setIsRunning(false);
      setIsPaused(false);
      setIsTriggered(false);
    };

    const onTargetAchieved = () => {
      setIsTargetAchieved(true);
    };

    const onTimeUpdated = (e: TimerEvent) => {
      setTimerValues(timer.getTimeValues().toString(UNITS_TO_SAVE));

      setIsRunning(timer.isRunning());
      setIsPaused(timer.isPaused());

      document.title = `${newTimer.getTimeValues().toString()} | laikas`;
    };

    newTimer.on('started', onStarted);
    newTimer.on('paused', onPaused);
    newTimer.on('stopped', onStop);
    newTimer.on('secondsUpdated', onTimeUpdated);
    newTimer.on('targetAchieved', onTargetAchieved);

    setTimer(newTimer);

    return () => {
      newTimer.stop();
      newTimer.removeAllEventListeners();

      document.title = 'laikas';
    };
  }, [startValues, target, precision, countdown]);

  return [timer, { isTargetAchieved, isRunning, isPaused, isTriggered }];
};

export default useTimer;
