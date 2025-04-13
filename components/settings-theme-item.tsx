import { cn } from '@/lib/utils';
import React, { type HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  name: string;
  colors: { foreground: string; background: string; primary: string };
  currentTheme: string | undefined;
}

function SettingsThemeItem({ title, name, colors, currentTheme, ...props }: Props) {
  return (
    <div
      className={cn(
        'hover:bg-hover flex cursor-pointer items-center justify-between rounded-sm border px-4 py-1 transition-colors',
        { 'border-primary': currentTheme === name },
        { 'border-2': currentTheme === name },
      )}
      {...props}
    >
      <p>{title}</p>
      <div className="flex items-center gap-2">
        <div className={`border-border h-4 w-4 rounded-full border ${colors.foreground}`} />
        <div className={`border-border h-4 w-4 rounded-full border ${colors.background}`} />
        <div className={`border-border h-4 w-4 rounded-full border ${colors.primary}`} />
      </div>
    </div>
  );
}

export default SettingsThemeItem;
