import { ChevronDownIcon } from '@heroicons/react/16/solid';

const ContactForm = () => {
  return (
    <form action="#" method="POST" className="">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            First name
          </label>
          <div className="mt-2.5">
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border bg-transparent px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2.5">
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border bg-transparent px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border bg-transparent px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="phone-number"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2.5">
            <div className="flex rounded-md outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                <select
                  id="country"
                  name="country"
                  autoComplete="country"
                  aria-label="Country"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md border bg-transparent py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-sky-400"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
              </div>
              <input
                id="phone-number"
                name="phone-number"
                type="text"
                placeholder="123-456-7890"
                className="block min-w-0 grow rounded-md bg-transparent py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-none focus:outline-none focus:ring-2 focus:ring-sky-400 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm/6 font-semibold text-gray-900"
          >
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full rounded-md border bg-transparent px-3.5 py-2 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:border-none focus:ring-2 focus:ring-sky-400"
              defaultValue={''}
            />
          </div>
        </div>
        <div className="flex gap-x-4 sm:col-span-2">
          <div className="flex h-6 items-center">
            <div className="inset-ring inset-ring-gray-900/5 has-checked:bg-indigo-600 has-focus-visible:outline-2 group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out">
              <span className="shadow-xs group-has-checked:translate-x-3.5 size-4 rounded-full bg-white ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out" />
              <input
                id="agree-to-policies"
                name="agree-to-policies"
                type="checkbox"
                aria-label="Agree to policies"
                className="focus:outline-hidden absolute inset-0 appearance-none"
              />
            </div>
          </div>
          <label
            htmlFor="agree-to-policies"
            className="text-sm/6 text-gray-600"
          >
            By selecting this, you agree to our{' '}
            <a
              href="#"
              className="whitespace-nowrap font-semibold text-indigo-600"
            >
              privacy policy
            </a>
            .
          </label>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="shadow-xs block w-full rounded-md bg-sky-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Let&apos;s talk
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
