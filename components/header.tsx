import React from 'react';

function Header() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src="./icon.png" alt="icon" className="h-10 w-10" />
      <div className="text text-center text-2xl leading-none font-medium">
        timeless
      </div>
    </div>
  );
}

export default Header;
