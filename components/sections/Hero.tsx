import Link from 'next/link';
import { services } from '@/lib/data/placeholder-data';
import { Banner, DemoButton, ServiceCard } from '@/components/ui';

const Hero: React.FC = () => {
  return (
    <section className="mx-auto grid h-full w-full max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="my-5 ml-2 sm:my-10">
          <div data-testid="banner">
            <Banner />
          </div>

          <h1 className="my-5 text-3xl font-bold sm:my-10 sm:text-4xl md:text-6xl">
            Your Car Deserves <br />
            <span className="text-sky-400">
              Premium <span className="text-orange-400">Detailing</span>
            </span>
          </h1>
          <p className="my-5 text-xs font-bold text-gray-700 sm:my-10 sm:w-4/5 sm:text-lg">
            Experience professional auto detailing services with our easy-to-use
            booking platform. We bring the shine back to your vehicle.
          </p>
          <div className="w-sm mt-8 flex">
            <Link
              href={'/booking'}
              className="mr-4 flex cursor-pointer items-center rounded-xl border bg-orange-400 px-3 py-2 text-xs font-bold text-white transition duration-200 hover:bg-orange-500/90 sm:mr-8 sm:px-6 sm:pb-3 sm:pt-2 sm:text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 size-5 sm:size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              Book now
            </Link>
            <DemoButton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-2 gap-y-4 bg-white/10 p-4 opacity-90 sm:grid-cols-2 sm:rounded-2xl sm:border sm:border-orange-300 sm:shadow-xl sm:shadow-sky-400">
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
    </section>
  );
};

export default Hero;
