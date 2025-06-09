'use client';

import Timer from '@/lib/timer';
import React, { useRef } from 'react';

export default function Page() {
  const [data, controls] = Timer();

  return (
    <div>
      <div>beta</div>
      {data.isRunning ? <div>running</div> : <div>not active</div>}
      <button type="button" onClick={controls.start}>
        start
      </button>
    </div>
  );
}
