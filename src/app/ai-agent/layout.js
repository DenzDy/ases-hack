import '../globals.css';

export const metadata = {
  title: 'Next.js Chatbot',
  description: 'A responsive dark mode chatbot with shadcn/ui',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <header className="bg-background text-primary py-4 shadow-sm sticky top-0 z-10">
          <div className="container px-4 mx-auto">
            <h1 className="text-xl font-bold">KatwiranAI</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}