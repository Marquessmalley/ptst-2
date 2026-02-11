import { DetailMenuItem } from "@/lib/definitions/definitions";
import Image from "next/image";
const PriceCard = ({ plan }: { plan: DetailMenuItem }) => {
  return (
    <div
      key={plan.id}
      className={
        plan.packageName === "Gold Package"
          ? "m-5 max-w-md cursor-pointer rounded-3xl border-2 border-orange-400 bg-slate-100 p-4 shadow transition duration-200 hover:scale-105 hover:transform hover:bg-slate-50"
          : "border-slate-30 m-5 max-w-md cursor-pointer rounded-3xl border bg-slate-100 p-4 shadow transition duration-200 hover:scale-105 hover:transform hover:bg-slate-50"
      }
    >
      {/* CARD HEADER */}
      <div className="flex items-center">
        <div className="flex flex-1 items-center">
          <Image
            src={"/wash.png"}
            alt="car"
            width={12}
            height={12}
            className={
              plan.packageName === "Gold Package"
                ? "h-11 w-11 rounded-full border bg-orange-400 p-3 shadow sm:h-12 sm:w-12"
                : "h-11 w-11 rounded-full border bg-sky-400 p-3 shadow sm:h-12 sm:w-12"
            }
          />
          <p className="ml-4 text-sm font-semibold sm:text-xl">
            {plan.packageName}
          </p>
        </div>

        <div className="w-18 flex items-center justify-center rounded-full border bg-white p-2 text-center shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            // width="20px"
            className="size-4"
            fill="#2854C5"
          >
            <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z" />
          </svg>
          <p className="ml-1 text-xs font-bold sm:text-sm">
            {plan.estimatedTime}
          </p>
        </div>
      </div>

      {/* CARD STARTING PRICE */}

      <div
        className={
          plan.packageName === "Gold Package"
            ? "mx-auto mb-10 mt-10 max-w-52 rounded-full border bg-gradient-to-r from-sky-400 to-orange-400 p-2 text-center shadow"
            : "mx-auto mb-10 mt-10 max-w-52 rounded-full border bg-sky-400 p-2 text-center shadow"
        }
      >
        <p className="text-sm font-bold text-white">
          Starting at {plan.startingPrice}
        </p>
      </div>

      {/* CARD SERVICES */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="ml-2 text-xs font-semibold sm:text-base">
            Interior includes:{" "}
          </p>
          <ul className="flex flex-col">
            {plan.services.interior ? (
              plan.services.interior.map((service) => {
                return (
                  <li key={service} className="mb-2 mt-2 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-sky-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="ml-2 w-full text-xs text-gray-600 sm:text-sm">
                      {service}
                    </p>
                  </li>
                );
              })
            ) : (
              <p className="text-md ml-2 w-full font-bold">
                Interior not included.
              </p>
            )}
          </ul>
        </div>
        <div>
          <p className="ml-2 text-xs font-semibold sm:text-base">
            Exterior includes:{" "}
          </p>
          <ul className="flex flex-col">
            {plan.services.exterior ? (
              plan.services.exterior.map((service) => {
                return (
                  <li key={service} className="mb-2 mt-2 flex">
                    {plan.packageName === "Gold Package" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-sky-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-sky-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <p className="ml-2 w-full text-xs text-gray-600 sm:text-sm">
                      {service}
                    </p>
                  </li>
                );
              })
            ) : (
              <p className="ml-2 w-full text-sm font-bold">
                Exterior not included.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
