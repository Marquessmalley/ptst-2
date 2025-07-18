'use client';
import { Hero, Pricing, Gallery, Faq, Contact } from '@/components/sections';

export default function Page() {
  return (
    <div className="">
      <div className="px-4 lg:mb-10 lg:mt-12 lg:px-10">
        <Hero />
      </div>
      <Pricing />
      <Gallery />
      <Faq />
      <Contact />
    </div>
  );
}
