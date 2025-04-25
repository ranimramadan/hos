'use client';
import { useState, useEffect } from 'react';
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { LanguageProvider } from '../context/LanguageContext';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <LanguageProvider>
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
    </LanguageProvider>
  );
}
