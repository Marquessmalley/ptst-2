import ContactForm from '../contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-center text-xl font-bold tracking-tight text-slate-900/80 sm:text-4xl">
          Contact Us
        </p>
        <p className="my-4 text-center text-sm font-normal text-gray-700 sm:text-lg">
          Have a question or need help? We&apo;re here for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="sm:col-span-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-900/80 sm:text-3xl">
            Business Information
          </h1>
          <div className="my-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 rounded-lg bg-slate-200 p-3 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            <p className="ml-3 text-sm font-semibold text-gray-800 sm:text-lg">
              318 Beulah St SE <br />
              Grand Rapids, MI 49507
            </p>
          </div>
          <div className="my-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 rounded-lg bg-slate-200 p-3 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <p className="ml-3 text-sm font-semibold text-gray-800 sm:text-lg">
              (616) 226-4109
            </p>
          </div>
          <div className="my-10 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 rounded-lg bg-slate-200 p-3 text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <p className="ml-3 text-sm font-semibold text-gray-800 sm:text-lg">
              ptshimetime@gmail.com
            </p>
          </div>
        </div>
        <div className="sm:col-span-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
