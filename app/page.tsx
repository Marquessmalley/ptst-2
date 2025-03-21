"use client";
import Link from "next/link";
import { services } from "@/app/lib/placeholder-data";
import Menu from "@/app/ui/navbar/Menu";
import Banner from "@/app/ui/banner/Banner";
import Demo from "@/app/ui/demo/Demo";
import ServiceCard from "@/app/ui/cards/ServiceCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300/40 via-slate-50 to-orange-300/40">
      <Menu />
      <div className="mx-auto grid max-w-6xl">
        <div className="mt-4 grid grid-cols-1 gap-y-10 sm:mt-22 lg:grid-cols-2">
          <div className="ml-2 ">
            <Banner />
            <h1 className="mt-6 text-5xl font-bold">
              Your Car Deserves <br />
              <span className="bg-gradient-to-r from-blue-600 to-orange-300 bg-clip-text text-transparent">
                Premium Detailing
              </span>
            </h1>
            <p className="mt-6 text-sm font-bold text-gray-700 sm:w-4/5">
              Experience professional auto detailing services with our
              easy-to-use booking platform. We bring the shine back to your
              vehicle.
            </p>
            <div className="mt-6 flex w-sm">
              <Link
                href={"/booking"}
                className="text-md mr-2 flex cursor-pointer rounded-xl border bg-gradient-to-t from-orange-300 to-blue-600 px-3 py-2 font-bold text-white transition duration-200 hover:bg-gradient-to-t hover:from-orange-500 hover:to-blue-700"
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
                Schedule now
              </Link>
              <Demo />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-2 gap-y-4 rounded-2xl bg-white/10 p-4 opacity-90 shadow-xl shadow-blue-600/50 sm:grid-cols-2 sm:border sm:border-orange-300">
            {services.map((service) => (
              <div key={service.id}>
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
            {/* <div className="h-30 cursor-pointer rounded-xl bg-gradient-to-t from-orange-300 to-blue-600 p-2 transition duration-200 hover:bg-gradient-to-t hover:from-orange-500 hover:to-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <h2 className="text-md py-4 font-bold text-slate-100">
                Choose the right package for you.{" "}
                <span className="text-orange-700">Check out our prices</span>
              </h2>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
