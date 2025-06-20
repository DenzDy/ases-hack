// app/layout.tsx (or wherever your root layout lives)
import { Bodoni_Moda, Arimo } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-bodoni',
  display: 'swap',
});

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-arimo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lexora',
  description: 'An application developed by Paul, John, and Denzell',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${arimo.variable}`}  /* exposes both vars */
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
