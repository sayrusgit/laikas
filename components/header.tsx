'use client';

import { themes } from '@/lib/themes';
import { red_hat_mono } from '@/styles/fonts';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center px-4 py-10">
      <Link href="/">
        <div className="flex items-center gap-2">
          <svg width={25} height={25} viewBox="0 0 114 114" fill="none">
            <title>logo</title>
            <circle cx="57" cy="57" r="55" stroke="var(--foreground)" strokeWidth="4" />
            <path
              d="M64.975 80.65C61.6383 80.65 59.0817 79.87 57.305 78.31C55.5283 76.75 54.64 74.41 54.64 71.29V36.645H42.875V32.745H59.385V70.835C59.385 72.8283 59.8617 74.2583 60.815 75.125C61.7683 75.9917 63.1767 76.425 65.04 76.425C66.1667 76.425 67.315 76.3167 68.485 76.1C69.655 75.84 70.955 75.4283 72.385 74.865V79.155C71.1283 79.5883 69.8717 79.935 68.615 80.195C67.4017 80.4983 66.1883 80.65 64.975 80.65Z"
              fill="var(--foreground)"
            />
          </svg>
          <div
            className={`text-center text-2xl leading-none font-medium text-[var(--foreground)] ${red_hat_mono.className}`}
          >
            laikas
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Header;
