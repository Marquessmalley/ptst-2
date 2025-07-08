import Image from 'next/image';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <Image src="/car-404.png" alt="" width={600} height={500} />
        <div className=" flex flex-row justify-center gap-10 p-4 ">
          <Link
            href="/"
            className="flex items-center justify-center text-md rounded-2xl px-4 py-2 font-bold bg-sky-500 hover:bg-sky-400  text-white duration-200"
          >
            Return Home{' '}
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
          </Link>
          <Link
            href="/booking"
            type="button"
            className="text-md rounded-2xl px-4 py-2 font-bold border-2 border-orange-300 duration-200 bg-slate-100 hover:bg-slate-50"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
