export interface WorkerMessage {
  action: 'start' | 'stop';
  duration: number;
}

export interface WorkerResponse {
  finished: true;
  timeLeft: number;
}

let intervalId: NodeJS.Timeout | null = null;
let endTime = 0;

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
  const { action, duration } = e.data;

  if (action === 'start') {
    endTime = Date.now() + duration;
    intervalId = setInterval(() => {
      const remaining = Math.max(0, endTime - Date.now());
      self.postMessage({ timeLeft: Math.ceil(remaining / 1000), finished: false });

      if (remaining <= 0 && intervalId) {
        clearInterval(intervalId);
        self.postMessage({ timeLeft: 0, finished: true });
      }
    }, 100);
  } else if (action === 'stop') {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
});
