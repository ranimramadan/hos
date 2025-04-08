'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Accept': 'application/json',
          },
          withCredentials: true
        });

        // Clear all auth data
        localStorage.clear();

        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
        setError('حدث خطأ أثناء تسجيل الخروج');
        setTimeout(() => router.push('/'), 2000);
      }
    };

    performLogout();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">{error}</h2>
          <p className="text-gray-600">جاري إعادة التوجيه...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">جاري تسجيل الخروج...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
}