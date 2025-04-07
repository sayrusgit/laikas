import React from 'react';
import { red_hat_mono } from '@/styles/fonts';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <Link href="/" className="flex items-center justify-center gap-2 px-4 py-10">
      <Image src="/icon.svg" alt="icon" width={25} height={25} />
      <div
        className={`text text-center text-2xl leading-none font-medium ${red_hat_mono.className}`}
      >
        laikas
      </div>
    </Link>
  );
}

export default Header;
