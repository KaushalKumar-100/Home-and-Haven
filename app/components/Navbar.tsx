"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4dc] bg-[#faf9f6]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          Home & Haven
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm text-[#716d64] md:flex">
          <Link href="/" className="transition hover:text-black">
            Home
          </Link>

          <div className="group relative">
            <button className="transition hover:text-black">
              Shop
            </button>

            <div className="invisible absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-2xl border border-[#e8e4dc] bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <Link
                href="/shop/home-decor"
                className="block rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
              >
                Home Decor
              </Link>

              <Link
                href="/shop/kitchen"
                className="block rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
              >
                Kitchen
              </Link>

              <Link
                href="/shop/bedroom"
                className="block rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
              >
                Bedroom
              </Link>

              <Link
                href="/shop/organization"
                className="block rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
              >
                Organization
              </Link>

              <Link
                href="/shop/lighting"
                className="block rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
              >
                Lighting
              </Link>
            </div>
          </div>

          <Link href="/best-picks" className="transition hover:text-black">
            Best Picks
          </Link>

          <Link href="/guides" className="transition hover:text-black">
            Guides
          </Link>

          <Link href="/about" className="transition hover:text-black">
            About
          </Link>

          <Link
            href="/guides"
            className="rounded-full bg-[#292722] px-5 py-2.5 text-white transition hover:bg-[#454139]"
          >
            Explore
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-[#292722] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#e8e4dc] bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-2">
            
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Home
            </Link>

            <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#99948b]">
              Shop
            </p>

            <Link
              href="/shop/home-decor"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Home Decor
            </Link>

            <Link
              href="/shop/kitchen"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Kitchen
            </Link>

            <Link
              href="/shop/bedroom"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Bedroom
            </Link>

            <Link
              href="/shop/organization"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Organization
            </Link>

            <Link
              href="/shop/lighting"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Lighting
            </Link>

            <div className="my-2 border-t border-[#e8e4dc]" />

            <Link
              href="/best-picks"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Best Picks
            </Link>

            <Link
              href="/guides"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              Guides
            </Link>

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-[#faf9f6]"
            >
              About
            </Link>

            <Link
              href="/guides"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-[#292722] px-5 py-3 text-center text-white hover:bg-[#454139]"
            >
              Explore
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}