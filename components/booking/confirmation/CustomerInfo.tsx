import { fetchCustomer } from "@/lib/data/booking";

export default async function CustomerInfo({
  customerId,
}: {
  customerId: string;
}) {
  const customerData = await fetchCustomer(customerId);
  if (!customerData) throw new Error("Customer data is missing");
  const { givenName, familyName, emailAddress, address } = customerData;
  return (
    <div className="mx-6 my-2">
      <p className="mb-2 text-lg font-bold">Contact Information</p>
      <div className="my-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-7 rounded-full bg-sky-400 p-1 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <div>
          <p className="ml-2 text-sm font-semibold text-gray-900">
            Customer Name
          </p>
          <p className="ml-2 text-xs font-normal text-gray-900">
            {givenName} {familyName}
          </p>
        </div>
      </div>
      <div className="my-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-7 rounded-full bg-sky-400 p-1 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
          />
        </svg>

        <div>
          <p className="ml-2 text-sm font-semibold text-gray-900">Email</p>
          <p className="ml-2 text-xs font-normal text-gray-900">
            {emailAddress}
          </p>
        </div>
      </div>
      <div className="my-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-7 rounded-full bg-sky-400 p-1 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        <div>
          <p className="ml-2 text-sm font-semibold text-gray-900">Location</p>
          <p className="ml-2 text-xs font-normal text-gray-900">
            {address?.addressLine1}
          </p>
          <p className="ml-2 text-xs font-normal text-gray-900">
            {address?.locality}, {address?.administrativeDistrictLevel1},{" "}
            {address?.postalCode}
          </p>
        </div>
      </div>
    </div>
  );
}
