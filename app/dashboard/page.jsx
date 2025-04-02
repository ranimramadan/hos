'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const stats = [
    { title: 'إجمالي المرضى', value: '1,234', change: '+12%' },
    { title: 'المواعيد اليوم', value: '42', change: '+8%' },
    { title: 'الأطباء النشطين', value: '18', change: '+2%' },
    { title: 'الإيرادات الشهرية', value: '₪52,000', change: '+15%' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">مرحباً بك في لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className="mr-2 text-sm font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">المواعيد القادمة</h2>
          {/* هنا يمكن إضافة جدول المواعيد */}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">إحصائيات سريعة</h2>
          {/* هنا يمكن إضافة الرسوم البيانية */}
        </div>
      </div>
    </div>
  );
}
  