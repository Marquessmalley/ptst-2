import { Divider } from "@heroui/react";

export default function BookingDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Top */}
      <div className="mb-10 grid grid-cols-1 place-items-center">
        <div className="my-2 flex items-center">
          <div className="h-10 w-48 rounded-md bg-gray-300" />
          <div className="ml-2 size-10 rounded-full bg-gray-300" />
        </div>
        <div className="mt-2 h-4 w-72 rounded-md bg-gray-200" />
      </div>

      {/* Middle */}
      <div className="mx-auto max-w-4xl rounded-xl border bg-white/10 p-4 shadow-lg backdrop-blur-lg">
        <div className="grid grid-cols-2">
          <div className="mx-6 my-1 space-y-2">
            <div className="h-6 w-40 rounded-md bg-gray-300" />
            <div className="h-4 w-56 rounded-md bg-gray-200" />
          </div>
          <div className="mx-6 my-2 h-7 w-24 justify-self-end rounded-3xl bg-gray-300" />
        </div>

        <Divider className="my-4" />

        <div className="grid grid-cols-2 gap-6">
          <div className="mx-6 my-2 space-y-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <div>
                  <div className="mb-1 h-4 w-32 rounded-md bg-gray-300" />
                  <div className="h-3 w-24 rounded-md bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="mx-6 my-2 space-y-6">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <div>
                  <div className="mb-1 h-4 w-32 rounded-md bg-gray-300" />
                  <div className="h-3 w-24 rounded-md bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
