'use client';
import React from 'react'
import '../../globals.css'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({user}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Hospital Logo" 
                width={50} 
                height={50}
                className="h-12 w-auto"
              />
              
            </Link>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="search"
                className="w-full bg-gray-50 rounded-full px-5 py-2.5 pl-12 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="بحث..."
              />
              <div className="absolute right-4 top-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Section - Notifications and Profile */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 hover:bg-gray-50 rounded-full py-2 px-4 transition-colors"
              >
                {user?.profile_image ? (
                  <Image
                  src={`http://127.0.0.1:8000/api/profile-image/${user.profile_image.split('/').pop()}`}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
                    {user?.name?.charAt(0) || 'م'}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 mr-2">
                  {user?.name || 'مستخدم'}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    الملف الشخصي
                  </Link>
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    الإعدادات
                  </Link>
                  <hr className="my-1" />
                  <Link href="../auth/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    تسجيل الخروج
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}