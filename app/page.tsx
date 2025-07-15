'use client';
import { Hero, Pricing, Faq } from '@/components/sections';

export default function Page() {
  return (
    <div className="">
      <div className="lg:mb-48 lg:mt-36">
        <Hero />
      </div>
      <Pricing />
      <Faq />
    </div>
  );
}
