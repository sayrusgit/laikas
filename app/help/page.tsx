'use client';

import Kbd from '@/components/ui/kbd';
import React from 'react';

function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl">help</h1>
      <div className="mt-4">
        <p className="text-xl">keybinds</p>
        <div>You can use the website with just your keyboard — no mouse required</div>
        <div className="mt-4 flex flex-col gap-3">
          <p>
            <Kbd>1</Kbd> <Kbd>2</Kbd> <Kbd>3</Kbd> <Kbd>4</Kbd> <Kbd>5</Kbd> to increase timer by
            15s, 5m, 10m, 20m, 60m correspondingly
          </p>
          <p>
            <Kbd>Shift + 1-5</Kbd> to decrease timer by 15s, 5m, 10m, 20m, 60m correspondingly
          </p>
          <p>
            <Kbd>Enter</Kbd> to start timer
          </p>
          <p>
            <Kbd>Space</Kbd> to pause timer
          </p>
          <p>
            <Kbd>Backspace</Kbd> to reset timer
          </p>
          <p>
            <Kbd>/</Kbd> go to settings
          </p>
          <p>
            <Kbd>h</Kbd> go to help
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
