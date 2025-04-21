"use client";
import "@/components/ui/global.css";
import { HeroUIProvider } from "@heroui/react";
import SplashScreen from "@/components/ui/splashscreen/SplashScreen";
import { useState, useEffect } from "react";
import Menu from "@/components/ui/navbar/Menu";

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
      <body>
        <HeroUIProvider>
          {isLoading ? (
            <>
              <SplashScreen />
            </>
          ) : (
            <main className="bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40">
              <Menu />
              {children}
            </main>
          )}
        </HeroUIProvider>
      </body>
    </html>
  );
}
