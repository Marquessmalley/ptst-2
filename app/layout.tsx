"use client";
import "@/app/ui/global.css";
import { HeroUIProvider } from "@heroui/react";
import SplashScreen from "@/app/ui/splashscreen/SplashScreen";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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
            <>{children}</>
          )}
        </HeroUIProvider>
      </body>
    </html>
  );
}
