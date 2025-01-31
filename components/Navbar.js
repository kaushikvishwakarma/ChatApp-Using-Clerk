'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { BellIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Forums', href: '/forums' },
  { name: 'Dual Chat', href: '/chat' },
  { name: 'Voice Chat', href: '/voicechat' },
  { name: 'About Us', href: '/about' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50">
      <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-md" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="group relative">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                ChatterHub
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all group-hover:w-full" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex flex-1 items-center justify-center">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    <div 
                      className={`absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} 
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section - Notifications & User */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Notification Button */}
            <button
              type="button"
              className="group relative rounded-full p-2 text-gray-400 hover:text-white 
                       transition-colors duration-200"
            >
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6 relative" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            </button>

            {/* User Button with custom appearance */}
            <div className="relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8 rounded-full ring-2 ring-purple-500/20 hover:ring-purple-500 transition-all duration-200",
                      userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                      userButtonPopoverFooter: "border-gray-800"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="relative px-2 pb-3 pt-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-purple-500/20 to-blue-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          
          {/* Mobile notifications and user button */}
          <div className="flex items-center justify-between px-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              className="group relative rounded-full p-2 text-gray-400 hover:text-white 
                       transition-colors duration-200"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6 relative" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
            </button>
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 rounded-full ring-2 ring-purple-500/20 hover:ring-purple-500 transition-all duration-200",
                  userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                  userButtonPopoverFooter: "border-gray-800"
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
