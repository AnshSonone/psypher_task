"use client"

import React, { useState } from "react";
import { SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md sticky w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">Psypher.AI</span>
          </div>

          {/* Menu (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className=" hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className=" hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </a>
            </div>
          </div>
            <SignedOut
              
            />
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="#" className="block hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Profile
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
