import type React from 'react';

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded-xs border border-border bg-card p-1 font-bold">{children}</kbd>;
}

export default Kbd;
