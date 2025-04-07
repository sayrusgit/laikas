import type { Metadata } from 'next';
import '@/styles/globals.css';
import { dm_mono } from '@/styles/fonts';
import Footer from '@/components/footer';
import Header from '@/components/header';

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
    <html lang="en">
      {process.env.NODE_ENV !== 'production' && (
        <head>
          <script crossOrigin="anonymous" src="https://unpkg.com/react-scan/dist/auto.global.js" />
        </head>
      )}
      <body className={`${dm_mono.className} text-foreground bg-background antialiased`}>
        <Header />
        <main className="mx-auto max-w-[600px] px-4">{children}</main>
        <Footer />
        <div className="bg-noise" />
      </body>
    </html>
  );
}
