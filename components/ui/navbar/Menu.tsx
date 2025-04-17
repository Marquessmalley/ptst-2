import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <Navbar className="w-full">
      <NavbarBrand className="mt-2 px-6">
        <Image src="/logo.png" alt="logo" height={120} width={120} />
      </NavbarBrand>
      <NavbarContent className="flex w-full justify-between px-2">
        <div className="flex gap-4"></div>
        <div className="flex gap-4">
          <NavbarItem className="lg:flex">
            <div className="rounded-3xl bg-gradient-to-b from-blue-600 to-orange-400 p-px cursor-pointer">
              <div className="rounded-[calc(1.5rem-1px)] bg-slate-100 p-1 transition duration-200 hover:bg-gray-200 flex items-center">
                <Image
                  src="/crown-blue.svg"
                  alt="crown"
                  height={26}
                  width={26}
                />

                <Link
                  href="#"
                  className="text-md rounded-2xl px-2 py-1 font-bold bg-gradient-to-r from-orange-400 to-blue-600 bg-clip-text text-transparent "
                >
                  Subscriptions
                </Link>
              </div>
            </div>
          </NavbarItem>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default Menu;
