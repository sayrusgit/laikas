'use client';

import SettingsSoundItem from '@/components/settings-sound-item';
import { Card } from '@/components/ui/card';
import SliderTicks from '@/components/ui/slider-ticks';
import { useCurrentSound } from '@/lib/hooks/use-current-sound';
import { useCurrentVolume } from '@/lib/hooks/use-current-volume';
import { sounds } from '@/lib/sounds';
import React from 'react';

function Page() {
  const [currentSound, setCurrentSound] = useCurrentSound();
  const [currentVolume, setCurrentVolume] = useCurrentVolume();

  const playAudio = (filename: string) => {
    const audio = new Audio(`/audio/${filename}`);
    audio.volume = currentVolume;
    audio.play();
  };

  return (
    <div className="items-start">
      <h1 className="text-center text-2xl">settings</h1>
      <Card className="mt-5 p-4">
        <p className="text-center text-xl">sound volume</p>
        <div>
          <SliderTicks
            value={[currentVolume * 10]}
            onValueChange={(e) => setCurrentVolume(e[0] / 10)}
          />
        </div>
        <p className="text-center text-xl">sound</p>
        <div className="flex flex-col justify-between gap-2">
          {sounds.map((sound) => (
            <SettingsSoundItem
              playAudio={playAudio}
              title={sound.title}
              filename={sound.filename}
              currentSound={currentSound}
              setCurrentSound={setCurrentSound}
              key={sound.filename}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Page;
