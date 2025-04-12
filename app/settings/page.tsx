'use client';

import SettingsSoundItem from '@/components/settings-sound-item';
import SettingsThemeItem from '@/components/settings-theme-item';
import { Card } from '@/components/ui/card';
import SliderTicks from '@/components/ui/slider-ticks';
import SoundRepeatsItem from '@/components/ui/sound-repeats-item';
import { useCurrentSound } from '@/lib/hooks/use-current-sound';
import { useCurrentVolume } from '@/lib/hooks/use-current-volume';
import { useSoundRepeats } from '@/lib/hooks/use-sound-repeats';
import { playAudio } from '@/lib/lib';
import { sounds } from '@/lib/sounds';
import { themes } from '@/lib/themes';
import { useTheme } from 'next-themes';
import React from 'react';

function Page() {
  const { setTheme } = useTheme();

  const [currentSound, setCurrentSound] = useCurrentSound();
  const [currentVolume, setCurrentVolume] = useCurrentVolume();
  const [repeats, setRepeats] = useSoundRepeats();

  const handleAudio = (filename: string) => {
    playAudio(filename, currentVolume);
  };

  return (
    <div>
      <h1 className="text-center text-2xl">settings</h1>
      <Card className="mt-5 p-4">
        <p className="text-center text-xl">theme</p>
        <div className="flex flex-col gap-3">
          {themes.map((theme) => (
            <SettingsThemeItem
              title={theme.label}
              colors={theme.colors}
              key={theme.label + theme.name}
              onClick={() => setTheme(theme.name)}
            />
          ))}
        </div>
        <p className="text-center text-xl">sound volume</p>
        <div>
          <SliderTicks
            value={[currentVolume ? currentVolume * 10 : 0]}
            onValueChange={(e) => setCurrentVolume(e[0] / 10)}
          />
        </div>
        <p className="text-center text-xl">sound repeats</p>
        <div className="flex items-center justify-center gap-5">
          <SoundRepeatsItem value={1} repeats={repeats} setRepeats={setRepeats} />
          <SoundRepeatsItem value={2} repeats={repeats} setRepeats={setRepeats} />
          <SoundRepeatsItem value={3} repeats={repeats} setRepeats={setRepeats} />
          <SoundRepeatsItem value={5} repeats={repeats} setRepeats={setRepeats} />
          <SoundRepeatsItem value={10} repeats={repeats} setRepeats={setRepeats} />
        </div>
        <p className="text-center text-xl">sound</p>
        <div className="flex flex-col justify-between gap-2">
          {sounds.map((sound) => (
            <SettingsSoundItem
              handleAudio={handleAudio}
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
