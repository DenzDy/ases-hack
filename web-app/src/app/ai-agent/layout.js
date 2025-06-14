import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Chatbot',
  description: 'A chatbot with shadcn/ui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground py-4 shadow-sm">
          <div className="container max-w-3xl">
            <h1 className="text-xl font-bold">ChatBot</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}