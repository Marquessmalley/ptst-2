"use client";
import "animate.css";
import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="animate__pulse flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40">
      <div className="">
        <Image
          src="/logo.png"
          alt="logo"
          height={200}
          width={300}
          className="animate__animated animate__pulse animate__infinite"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
