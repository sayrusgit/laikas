import type React from 'react';

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="bg-card border-border rounded-xs border p-1 font-bold">{children}</kbd>;
}

export default Kbd;
