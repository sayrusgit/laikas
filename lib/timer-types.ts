export interface TimerTime {
  hrs: number;
  mins: number;
  secs: number;
}

export interface TimerData {
  initialTime: number;
  isRunning: boolean;
  isFinished: boolean;
  isPaused: boolean;
}

export interface TimerControls {
  set: (secs: number) => void;
  start: () => void;
  pause: () => void;
  stop: () => void;
}
