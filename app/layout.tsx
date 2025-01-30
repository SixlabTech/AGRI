import './globals.css';
import type { Metadata } from 'next';

const inter = { className: 'font-body' };

export const metadata: Metadata = {
  title: 'ITM AI Platform',
  description: 'Intelligence artificielle pour ITM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex h-screen bg-black text-white">
          
          <div className="flex flex-1 flex-col">
        
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
