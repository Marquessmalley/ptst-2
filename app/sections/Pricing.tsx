import { detailMenu } from "@/lib/placeholder-data";
import PriceCard from "@/components/ui/cards/PricingCards";

const Pricing: React.FC = () => {
  const specialPackages = detailMenu.slice(0, 3);

  return (
    <div id="pricing" className="my-10 pt-24 sm:pt-32">
      {/* PRICE HEADER */}
      <div className="mx-auto mb-4 max-w-md sm:max-w-xl md:max-w-3xl lg:text-center">
        <div className="mx-4">
          <p className=" text-center text-2xl font-bold tracking-tight text-slate-900/80  sm:text-4xl">
            Choose the right package for you
          </p>
          <p className="my-4 text-center text-lg text-gray-700 font-extralight  lg:text-justify">
            Whether you're looking for a basic clean or a comprehensive
            detailing service, our pricing is transparent and competitive.{" "}
            <span
              // href="/prices"
              className="inline-flex items-center justify-center font-semibold  text-blue-600"
            >
              Check out our prices{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-2 size-5 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
      {/* PRICE CARDS */}

      <div className="mx-auto grid max-w-7xl justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {specialPackages.map((plan) => {
          return (
            <div key={plan.id} className="">
              <PriceCard plan={plan} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
