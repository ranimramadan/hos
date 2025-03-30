'use client';
import { useState } from 'react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('general');
  const [dateRange, setDateRange] = useState('daily');

  const statistics = {
    patients: {
      total: 1250,
      new: 45,
      discharged: 38,
      inTreatment: 180
    },
    appointments: {
      total: 320,
      completed: 280,
      cancelled: 25,
      upcoming: 15
    },
    revenue: {
      total: "₪125,000",
      treatments: "₪75,000",
      medications: "₪35,000",
      laboratory: "₪15,000"
    },
    departments: {
      mostActive: "قسم الطوارئ",
      leastActive: "قسم الجلدية"
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">التقارير والإحصائيات</h1>
        
        {/* Report Type Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedReport('general')}
            className={`px-4 py-2 rounded-lg ${selectedReport === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            تقرير عام
          </button>
          <button
            onClick={() => setSelectedReport('financial')}
            className={`px-4 py-2 rounded-lg ${selectedReport === 'financial' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            تقرير مالي
          </button>
          <button
            onClick={() => setSelectedReport('medical')}
            className={`px-4 py-2 rounded-lg ${selectedReport === 'medical' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            تقرير طبي
          </button>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setDateRange('daily')}
            className={`px-4 py-2 rounded-lg ${dateRange === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            يومي
          </button>
          <button
            onClick={() => setDateRange('weekly')}
            className={`px-4 py-2 rounded-lg ${dateRange === 'weekly' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            أسبوعي
          </button>
          <button
            onClick={() => setDateRange('monthly')}
            className={`px-4 py-2 rounded-lg ${dateRange === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          >
            شهري
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">إحصائيات المرضى</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">العدد الكلي</span>
              <span className="font-semibold">{statistics.patients.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">مرضى جدد</span>
              <span className="text-green-600">+{statistics.patients.new}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تم خروجهم</span>
              <span className="text-blue-600">{statistics.patients.discharged}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تحت العلاج</span>
              <span className="text-orange-600">{statistics.patients.inTreatment}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">المواعيد</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">إجمالي المواعيد</span>
              <span className="font-semibold">{statistics.appointments.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">مكتملة</span>
              <span className="text-green-600">{statistics.appointments.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ملغاة</span>
              <span className="text-red-600">{statistics.appointments.cancelled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">قادمة</span>
              <span className="text-blue-600">{statistics.appointments.upcoming}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">الإيرادات</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">الإجمالي</span>
              <span className="font-semibold">{statistics.revenue.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">العلاجات</span>
              <span className="text-green-600">{statistics.revenue.treatments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الأدوية</span>
              <span className="text-blue-600">{statistics.revenue.medications}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">المختبر</span>
              <span className="text-purple-600">{statistics.revenue.laboratory}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">نشاط الأقسام</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">الأكثر نشاطاً</span>
              <span className="text-green-600">{statistics.departments.mostActive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الأقل نشاطاً</span>
              <span className="text-red-600">{statistics.departments.leastActive}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          تصدير PDF
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          تصدير Excel
        </button>
      </div>
    </div>
  );
}