import '@/styles/globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { THEMES_LIST } from '@/lib/themes';
import { dm_mono } from '@/styles/fonts';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {process.env.NODE_ENV === 'development' && (
        <head>
          <script crossOrigin="anonymous" src="https://unpkg.com/react-scan/dist/auto.global.js" />
        </head>
      )}
      <body
        className={`${dm_mono.className} theme-retro-arcade text-foreground bg-background antialiased`}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
