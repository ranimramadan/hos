'use client';
import { useState } from 'react';

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    {
      id: 1,
      name: 'قسم الطوارئ',
      head: 'د. محمد أحمد',
      doctors: 12,
      nurses: 24,
      patients: 45,
      status: 'نشط',
      location: 'الطابق الأرضي',
      description: 'يقدم خدمات الرعاية الطارئة على مدار 24 ساعة'
    },
    {
      id: 2,
      name: 'قسم الجراحة العامة',
      head: 'د. سارة خالد',
      doctors: 8,
      nurses: 16,
      patients: 30,
      status: 'نشط',
      location: 'الطابق الثاني',
      description: 'متخصص في العمليات الجراحية العامة والمناظير'
    },
    {
      id: 3,
      name: 'قسم الأطفال',
      head: 'د. أحمد محمود',
      doctors: 10,
      nurses: 20,
      patients: 35,
      status: 'نشط',
      location: 'الطابق الثالث',
      description: 'رعاية متكاملة للأطفال وحديثي الولادة'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.includes(searchTerm) ||
    dept.head.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">الأقسام الطبية</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          إضافة قسم جديد +
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="search"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="بحث في الأقسام..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${dept.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {dept.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>رئيس القسم: {dept.head}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{dept.location}</span>
                </div>

                <p className="text-gray-600 text-sm">{dept.description}</p>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-blue-600">{dept.doctors}</div>
                    <div className="text-sm text-gray-500">طبيب</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-600">{dept.nurses}</div>
                    <div className="text-sm text-gray-500">ممرض</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-purple-600">{dept.patients}</div>
                    <div className="text-sm text-gray-500">مريض</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2 flex-row-reverse">
              <button className="text-blue-600 hover:text-blue-900">عرض التفاصيل</button>
              <button className="text-gray-600 hover:text-gray-900 mx-2">تعديل</button>
              <button className="text-red-600 hover:text-red-900">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}