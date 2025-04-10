import { Switch } from '@/components/ui/switch';
import React, { useId, useState } from 'react';

function SettingsUi() {
  const id = useId();

  const [isBgNoise, setIsBgNoise] = useState(true);

  return (
    <div>
      <p className="text-center text-xl">ui</p>
      <div className="flex justify-between">
        Background texture:
        <div
          className="group inline-flex items-center gap-2"
          data-state={isBgNoise ? 'checked' : 'unchecked'}
        >
          <span
            id={`${id}-off`}
            className="group-data-[state=checked]:text-muted-foreground/70 flex-1 cursor-pointer text-right text-sm font-medium"
            aria-controls={id}
            onMouseDown={() => setIsBgNoise(false)}
          >
            Off
          </span>
          <Switch
            id={id}
            checked={isBgNoise}
            onCheckedChange={() => setIsBgNoise(!isBgNoise)}
            aria-labelledby={`${id}-off ${id}-on`}
          />
          <span
            id={`${id}-on`}
            className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 cursor-pointer text-left text-sm font-medium"
            aria-controls={id}
            onMouseDown={() => setIsBgNoise(true)}
          >
            On
          </span>
        </div>
      </div>
    </div>
  );
}

export default SettingsUi;
