'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">Medi</span>
            <span className="text-2xl font-bold text-teal-500">Care</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600 font-medium">Find Doctors</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact Us</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/doctors" className="text-gray-600 hover:text-blue-600 font-medium">Find Doctors</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">About Us</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact Us</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
