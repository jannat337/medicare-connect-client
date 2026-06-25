'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, dbUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm truncate">{user.displayName}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
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
            {user ? (
              <button onClick={handleLogout} className="text-left text-red-500 font-medium">Logout</button>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}