'use client';
import Link from 'next/link';
import { services } from '@/lib/data/placeholder-data';
import { Banner, Demo, ServiceCard, PackageCard } from '@/components/ui';
import Pricing from '@/components/sections/Pricing';
import Faq from '@/components/sections/Faq';

export default function Page() {
  return (
    <div className="mt-20">
      <div className="mx-auto grid max-w-6xl">
        <div className="mt-4 grid grid-cols-1 gap-y-10 sm:mt-22 lg:grid-cols-2">
          <div className="ml-2 ">
            <div data-testid="banner">
              <Banner />
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl font-bold">
              Your Car Deserves <br />
              <span className="text-sky-400">
                Premium <span className="text-orange-400">Detailing</span>
              </span>
            </h1>
            <p className="mt-6 text-sm font-bold text-gray-700 sm:w-4/5">
              Experience professional auto detailing services with our
              easy-to-use booking platform. We bring the shine back to your
              vehicle.
            </p>
            <div className="mt-6 flex w-sm">
              <Link
                href={'/booking'}
                className="text-md mr-2 flex cursor-pointer rounded-xl border bg-orange-400 px-3 py-2 font-bold text-white transition duration-200 hover:bg-orange-500/90 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-2 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                Book now
              </Link>
              <Demo />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-2 gap-y-4 rounded-2xl bg-white/10 p-4 opacity-90 shadow-xl shadow-sky-400 sm:grid-cols-2 sm:border sm:border-orange-300">
            {services.map((service) => (
              <div key={service.id}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pricing />
      <Faq />
    </div>
  );
}
