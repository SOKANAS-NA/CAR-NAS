"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `rounded-md px-3 py-2 text-sm font-medium ${
      pathname === path
        ? "text-black"
        : "text-white-900 hover:bg-gray-700 hover:text-black"
    }`;

  return (
    <nav className="bg-white-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div id="pic">
            <Link href="/">
              <Image
                src='/public/image/Red Black Minimalist Exotic Cars Logo.png'
                alt="Logo"
                width={70}
                height={70}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div
            className="hidden sm:flex space-x-4"
            style={{ fontSize: "300px" }}
          >
            <Link href="/" className={linkClass("/")}>
              HOME
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              CARS
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              ABOUT
            </Link>
            <Link href="/user" className={linkClass("/user")}>
              SUBSCRIBE
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              id="burger"
              aria-label="Toggle navigation"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden flex flex-col px-2 pt-2 pb-3 space-y-1 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>
        <Link href="/contact" className={linkClass("/contact")}>
          Contact
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          About
        </Link>
        <Link href="/user" className={linkClass("/user")}>
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
