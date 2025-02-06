"use client";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex ">
      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 rounded bg-transparent text-slate-400"
        onClick={toggleSidebar}
      >
        {isOpen ? <IoClose /> : <IoMdMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-5 left-0 h-screen bg-gray-900 text-white md:relative md:translate-x-0 md:w-48 lg:w-80 sm:w-48 w-40 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
<div className=" md:flex  p-4">
  <UserButton />
</div>

        <div className="p-6 text-3xl font-extrabold border-b border-gray-700 text-center">
          Menu
        </div>

        <ul className="mt-6 space-y-6 p-6 text-lg">
          <Link href="/">
            <li className="hover:bg-gray-700 p-3 rounded transition-colors cursor-pointer text-center">
              Home
            </li>
          </Link>

          <Link href="/cars">
            <li className="hover:bg-gray-700 p-3 rounded transition-colors cursor-pointer text-center">
              Cars
            </li>
          </Link>

          <Link href="/bookings">
            <li className="hover:bg-gray-700 p-3 rounded transition-colors cursor-pointer text-center">
              Bookings
            </li>
          </Link>
        </ul>

        {/* User Button at the Bottom */}
        
      </div>
    </div>
  );
};

export default Sidebar;

 