import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="sticky top-0 z-40 h-20 bg-transparent backdrop-blur-lg backdrop-saturate-150">
      <div className="flex items-center px-6">
        <div className="mt-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" height={120} width={120} />
          </Link>
        </div>

        <div className="flex w-full justify-end">
          <div className="cursor-pointer rounded-3xl bg-gradient-to-b from-sky-400 to-orange-400 p-px">
            <div className="flex items-center rounded-[calc(1.5rem-1px)] bg-slate-100 p-1 transition duration-200 hover:bg-slate-50">
              <Image src="/crown-blue.svg" alt="crown" height={22} width={22} />

              <Link
                href="#"
                className="sm:text-md rounded-2xl bg-gradient-to-r from-orange-400 to-sky-500 bg-clip-text px-2 py-1 text-xs font-bold text-transparent"
              >
                Subscriptions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
