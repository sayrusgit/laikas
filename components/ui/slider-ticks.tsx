import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import type * as SliderPrimitive from '@radix-ui/react-slider';
import type React from 'react';

export default function SliderTicks(
  props: React.ComponentProps<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  },
) {
  const max = 10;
  const skipInterval = 2;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  return (
    <div className="*:not-first:mt-4">
      <Slider max={max} step={1} aria-label="Slider with ticks" {...props} />
      <span
        className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
        aria-hidden="true"
      >
        {ticks.map((_, i) => (
          <span
            key={i + performance.now()}
            className="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span
              className={cn('bg-muted-foreground/70 h-1 w-px', i % skipInterval !== 0 && 'h-0.5')}
            />
            <span className={cn(i % skipInterval !== 0 && 'opacity-0')}>{i}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
