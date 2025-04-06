import type { Metadata } from 'next';
import '@/styles/globals.css';
import { dm_mono } from '@/styles/fonts';
import Footer from '@/components/footer';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'timeless',
  description: 'Timeless — simple and highly customizable timer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_mono.className} text-foreground bg-background mx-auto flex h-[100vh] max-w-[900px] flex-col justify-between gap-5 px-4 py-10 antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="bg-noise" />
      </body>
    </html>
  );
}
