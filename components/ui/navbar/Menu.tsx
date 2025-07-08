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
    <div className=" bg-transparent h-20 z-40  sticky top-0 backdrop-blur-lg  backdrop-saturate-150">
      <div className="flex items-center px-6">
        <div className="mt-2">
          <Link href="/">
            <Image src="/logo.png" alt="logo" height={120} width={120} />
          </Link>
        </div>

        <div className=" w-full flex justify-end ">
          <div className="rounded-3xl bg-gradient-to-b from-sky-400 to-orange-400 p-px cursor-pointer ">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-100 p-1 transition duration-200 hover:bg-slate-50 flex items-center">
              <Image src="/crown-blue.svg" alt="crown" height={22} width={22} />

              <Link
                href="#"
                className="text-md rounded-2xl px-2 py-1 font-bold bg-gradient-to-r from-orange-400 to-sky-500 bg-clip-text text-transparent "
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
