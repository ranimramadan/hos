'use client';
import { useState } from 'react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('general');
  const [dateRange, setDateRange] = useState('daily');

  const reports = [
    { id: 'general', label: 'تقرير عام', icon: '📊' },
    { id: 'financial', label: 'تقرير مالي', icon: '💰' },
    { id: 'medical', label: 'تقرير طبي', icon: '🏥' }
  ];

  const dateRanges = [
    { id: 'daily', label: 'يومي' },
    { id: 'weekly', label: 'أسبوعي' },
    { id: 'monthly', label: 'شهري' }
  ];

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
      total: "$125,000",
      treatments: "$75,000",
      medications: "$35,000",
      laboratory: "$15,000"
    },
    departments: {
      mostActive: "Emergency",
      leastActive: "Dermatology"
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <span className="text-blue-600 text-3xl">📈</span>
              التقارير والإحصائيات
            </h1>
            <p className="text-gray-500">عرض وتحليل البيانات الإحصائية للمستشفى</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PDF تصدير
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Excel تصدير
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6 justify-between">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-gray-600">نوع التقرير</h2>
              <div className="flex gap-3">
                {reports.map(report => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      selectedReport === report.id 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{report.icon}</span>
                    {report.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-medium text-gray-600">الفترة الزمنية</h2>
              <div className="flex gap-3">
                {dateRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      dateRange === range.id 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Patient Statistics Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-600">👥</span>
              إحصائيات المرضى
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600">إجمالي المرضى</span>
                <span className="font-semibold text-lg">{statistics.patients.total}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="text-gray-600">مرضى جدد</span>
                <span className="text-green-600 font-medium">+{statistics.patients.new}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                <span className="text-gray-600">تم خروجهم</span>
                <span className="text-blue-600 font-medium">{statistics.patients.discharged}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                <span className="text-gray-600">تحت العلاج</span>
                <span className="text-orange-600 font-medium">{statistics.patients.inTreatment}</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-600">📅</span>
              المواعيد
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600">إجمالي المواعيد</span>
                <span className="font-semibold text-lg">{statistics.appointments.total}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="text-gray-600">مكتملة</span>
                <span className="text-green-600 font-medium">{statistics.appointments.completed}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                <span className="text-gray-600">ملغاة</span>
                <span className="text-red-600 font-medium">{statistics.appointments.cancelled}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                <span className="text-gray-600">قادمة</span>
                <span className="text-blue-600 font-medium">{statistics.appointments.upcoming}</span>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-green-600">💰</span>
              الإيرادات
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="text-gray-600">إجمالي الإيرادات</span>
                <span className="font-semibold text-lg">{statistics.revenue.total}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                <span className="text-gray-600">العلاجات</span>
                <span className="text-green-600 font-medium">{statistics.revenue.treatments}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                <span className="text-gray-600">الأدوية</span>
                <span className="text-blue-600 font-medium">{statistics.revenue.medications}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded-lg">
                <span className="text-gray-600">المختبر</span>
                <span className="text-purple-600 font-medium">{statistics.revenue.laboratory}</span>
              </div>
            </div>
          </div>

          {/* Department Activity Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-indigo-600">🏥</span>
              نشاط الأقسام
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-gray-600 mb-1">الأكثر نشاطاً</p>
                <p className="text-green-600 font-medium text-lg">{statistics.departments.mostActive}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-gray-600 mb-1">الأقل نشاطاً</p>
                <p className="text-red-600 font-medium text-lg">{statistics.departments.leastActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}