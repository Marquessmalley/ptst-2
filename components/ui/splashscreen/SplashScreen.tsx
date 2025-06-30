'use client';
import 'animate.css';
import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40 flex justify-center items-center animate__pulse">
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
