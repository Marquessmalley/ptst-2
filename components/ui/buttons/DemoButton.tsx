'use client';
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const DemoButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button
        onClick={openModal}
        className="flex cursor-pointer items-center rounded-xl border border-sky-500 bg-slate-100 px-3 py-2 text-xs font-bold text-sky-500 transition duration-200 hover:bg-slate-50 sm:px-6 sm:pb-3 sm:pt-2 sm:text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#3B82F6"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-2 size-5 sm:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
        Watch Demo
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <video controls preload="none" width="600">
                    <source
                      src={process.env.NEXT_PUBLIC_VERCEL_DEMO_BLOB_URL}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DemoButton;
