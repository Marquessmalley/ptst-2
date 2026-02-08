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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="flex min-h-screen flex-col font-['Inter',sans-serif]">
        <HeroUIProvider>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40">
              <Menu />
              <main className="animate__animated animate__fadeIn animate__slow flex flex-grow items-center justify-center">
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
