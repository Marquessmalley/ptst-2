'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl border border-orange-200 bg-white/10 px-8 py-10 text-center shadow-lg backdrop-blur-lg">
        <h2 className="mb-4 text-3xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="mb-6 text-sm text-gray-700">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-2xl bg-gradient-to-r from-orange-400 to-sky-500 px-6 py-2 font-bold text-white shadow transition hover:from-orange-500 hover:to-sky-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
