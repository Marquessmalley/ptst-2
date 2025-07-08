'use client';
import '@/components/ui/global.css';
import { HeroUIProvider } from '@heroui/react';
import SplashScreen from '@/components/ui/splashscreen/SplashScreen';
import { useState, useEffect } from 'react';
import Menu from '@/components/ui/navbar/Menu';
import Footer from '@/components/ui/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <HeroUIProvider>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40">
              <Menu />
              <main className="flex-grow flex justify-center items-center">
                {children}
              </main>
              <Footer />
            </div>
          )}
        </HeroUIProvider>
      </body>
    </html>
  );
}
