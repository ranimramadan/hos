'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // حذف معلومات تسجيل الدخول من التخزين المحلي
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // إعادة التوجيه إلى الصفحة الرئيسية
    router.push('/');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">جاري تسجيل الخروج...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
}