import { Divider } from '@heroui/react';

export default function BookingDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Top */}
      <div className="grid grid-cols-1 place-items-center mb-10">
        <div className="flex items-center my-2">
          <div className="h-10 w-48 bg-gray-300 rounded-md" />
          <div className="size-10 bg-gray-300 rounded-full ml-2" />
        </div>
        <div className="h-4 w-72 bg-gray-200 rounded-md mt-2" />
      </div>

      {/* Middle */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border p-4">
        <div className="grid grid-cols-2">
          <div className="space-y-2 mx-6 my-1">
            <div className="h-6 w-40 bg-gray-300 rounded-md" />
            <div className="h-4 w-56 bg-gray-200 rounded-md" />
          </div>
          <div className="justify-self-end mx-6 my-2 h-7 w-24 bg-gray-300 rounded-3xl" />
        </div>

        <Divider className="my-4" />

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 mx-6 my-2">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                <div>
                  <div className="h-4 w-32 bg-gray-300 rounded-md mb-1" />
                  <div className="h-3 w-24 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 mx-6 my-2">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                <div>
                  <div className="h-4 w-32 bg-gray-300 rounded-md mb-1" />
                  <div className="h-3 w-24 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
