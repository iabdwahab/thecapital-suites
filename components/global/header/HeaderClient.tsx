"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderData = {
  id: number;
  acf: {
    logo: false | string;
    links: {
      link_1: { text: string; href: string };
      link_2: { text: string; href: string };
      link_3: { text: string; href: string };
      link_4: { text: string; href: string };
      link_5: { text: string; href: string };
      link_6: { text: string; href: string };
    };
    button: { text: string; href: string };
  };
};

export default function HeaderClient({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false);
  const links = Object.values(data.acf.links);

  return (
    <header className="text-[#F8F8F8] fixed left-1/2 -translate-x-1/2 rounded-xl lg:rounded-full top-2 z-50 w-[calc(100%-20px)] lg:container bg-[rgba(255,255,255,0.1)] backdrop-blur-xl">
      {/* top row */}
      <div className="flex items-center justify-between px-6 lg:px-10! py-3">
        <Link href="/" className="block">
          <Image
            src={data.acf.logo || "/logo.png"}
            alt="Logo"
            width={200}
            height={200}
            className="w-16"
          />
        </Link>

        {/* desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-4 lg:pr-14">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="hover:opacity-80 transition-opacity duration-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* desktop button */}
        <Link
          href={data.acf.button.href || "#"}
          className="hidden lg:block border border-[#F8F8F830] px-8 rounded-full backdrop-blur-3xl py-1 hover:opacity-80 transition-opacity duration-300"
        >
          {data.acf.button.text || "احجز الآن"}
        </Link>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden p-1"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* mobile dropdown panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-4">
          <ul className="flex flex-col gap-3">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block hover:opacity-80 transition-opacity duration-300"
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={data.acf.button.href || "#"}
                onClick={() => setOpen(false)}
                className="block text-center border border-[#F8F8F830] px-8 rounded-full backdrop-blur-3xl py-2 hover:opacity-80 transition-opacity duration-300 "
              >
                {data.acf.button.text || "احجز الآن"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
