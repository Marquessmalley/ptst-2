import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { faq } from '@/lib/data/placeholder-data';

const Faq: React.FC = () => {
  return (
    <div id="faq" className="mb-10 w-full px-4">
      <div className="mx-auto mb-5 grid max-w-7xl grid-cols-1">
        <h2 className="mb-4 text-xl font-extrabold text-slate-900/80 sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>
      <div className="divide-black/3 mx-auto max-w-7xl divide-y rounded-xl border-2">
        {faq.map((qa) => {
          return (
            <Disclosure
              key={qa.id}
              as="div"
              className="p-6"
              defaultOpen={false}
            >
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="sm:text-md hover:text-black-50 text-sm font-medium text-black">
                  {qa.question}
                </span>
                <ChevronDownIcon className="size-5 text-black group-data-[open]:rotate-180 dark:text-white" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm font-medium text-black/80 dark:text-slate-200">
                {qa.answer}
              </DisclosurePanel>
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
