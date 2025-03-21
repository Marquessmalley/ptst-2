"use client";
import React, { useState, useEffect } from "react";
import SplashScreen from "@/app/ui/splashscreen/SplashScreen";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="">
      {isLoading ? (
        <>
          <SplashScreen />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default BookingLayout;
