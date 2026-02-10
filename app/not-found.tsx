import Image from 'next/image';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='text-center'>
        <Image src='/car-404.png' alt='' width={375} height={300} />
        <div className='flex flex-row justify-center gap-10 p-4'>
          <Link
            href='/'
            className='flex items-center justify-center whitespace-nowrap rounded-2xl bg-sky-500 px-2 py-2 text-xs font-bold text-white duration-200 hover:bg-sky-400 sm:px-4 sm:py-3'
          >
            Return Home{' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              className='ml-1 size-4 font-bold'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
              />
            </svg>
          </Link>
          <Link
            href='/booking'
            type='button'
            className='whitespace-nowrap rounded-2xl border-2 border-orange-300 bg-slate-100 px-2 py-2 text-xs font-bold duration-200 hover:bg-slate-50 sm:px-4 sm:py-3'
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
