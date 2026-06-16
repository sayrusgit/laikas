import type { Metadata } from 'next';

import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { THEMES_LIST } from '@/lib/themes';
import { dm_mono } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'laikas',
  description: 'Laikas — simple and highly customizable timer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dm_mono.className} theme-retro-arcade bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={THEMES_LIST}
          disableTransitionOnChange
        >
          <Header />
          <main className="mx-auto max-w-[600px] px-4">{children}</main>
          <Footer />
          <div className="bg-noise" />
        </ThemeProvider>
      </body>
    </html>
  );
}
