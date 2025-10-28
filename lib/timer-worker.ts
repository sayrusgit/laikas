export interface WorkerMessage {
  action: 'start' | 'stop';
  duration: number;
}

export interface WorkerResponse {
  finished: boolean;
  timeLeft: number;
}

let intervalId: number | null = null;
let endTime = 0;

const cleanupTimer = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
  const { action, duration } = e.data;

  if (action === 'start') {
    cleanupTimer();

    endTime = Date.now() + duration;

    intervalId = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      const timeLeft = Math.ceil(remaining / 1000);

      // Only post message if there's a meaningful update
      if (remaining <= 0) {
        cleanupTimer();
        self.postMessage({ timeLeft: 0, finished: true });
      } else {
        self.postMessage({ timeLeft, finished: false });
      }
    }, 1000) as unknown as number;
  } else if (action === 'stop') {
    cleanupTimer();
  }
});
