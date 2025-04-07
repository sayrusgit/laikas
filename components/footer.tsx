import React from 'react';

function Footer() {
  return (
    <footer className="flex flex-col items-center px-4 py-10 text-sm">
      <p className="text-muted-foreground">made with ❤ by sayrus</p>
      <p className="text-muted-foreground">
        <a
          href="https://github.com/sayrusgit/laikas"
          className="text-blue-300"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <span> / </span>
        <a
          href="https://x.com/real_sayrus"
          className="text-blue-300"
          target="_blank"
          rel="noreferrer"
        >
          X
        </a>
      </p>
    </footer>
  );
}

export default Footer;
