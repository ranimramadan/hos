'use client';
import { useState } from 'react';

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const doctors = [
    {
      id: 1,
      name: 'د. محمد أحمد',
      specialty: 'طب عام',
      department: 'الطوارئ',
      phone: '0501234567',
      email: 'dr.mohammad@hospital.com',
      schedule: 'صباحي',
      status: 'متاح',
      patients: 45
    },
    {
      id: 2,
      name: 'د. سارة خالد',
      specialty: 'أمراض قلب',
      department: 'القلب',
      phone: '0507654321',
      email: 'dr.sarah@hospital.com',
      schedule: 'مسائي',
      status: 'في عيادة',
      patients: 32
    },
    {
      id: 3,
      name: 'د. أحمد محمود',
      specialty: 'جراحة عامة',
      department: 'الجراحة',
      phone: '0509876543',
      email: 'dr.ahmad@hospital.com',
      schedule: 'صباحي',
      status: 'في عملية',
      patients: 28
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.includes(searchTerm) ||
    doctor.specialty.includes(searchTerm) ||
    doctor.department.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">قائمة الأطباء</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          إضافة طبيب جديد +
        </button>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="بحث عن طبيب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {doctor.name.charAt(2)}
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">القسم:</span>
                <span className="text-gray-900">{doctor.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الهاتف:</span>
                <span className="text-gray-900">{doctor.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">البريد:</span>
                <span className="text-gray-900">{doctor.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الدوام:</span>
                <span className="text-gray-900">{doctor.schedule}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">عدد المرضى:</span>
                <span className="text-gray-900">{doctor.patients}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${doctor.status === 'متاح' ? 'bg-green-100 text-green-800' : 
                    doctor.status === 'في عيادة' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {doctor.status}
                </span>
                <div className="space-x-2 flex flex-row-reverse">
                  <button className="text-blue-600 hover:text-blue-900">عرض</button>
                  <button className="text-gray-600 hover:text-gray-900 mx-2">تعديل</button>
                  <button className="text-red-600 hover:text-red-900">حذف</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}