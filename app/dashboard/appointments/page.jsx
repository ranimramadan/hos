'use client';
import { useState } from 'react';

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: 1,
      patientName: 'محمد علي',
      doctorName: 'د. أحمد محمود',
      department: 'طب عام',
      date: '2024-01-20',
      time: '09:30',
      status: 'محجوز',
      type: 'كشف أولي',
      phone: '0501234567'
    },
    {
      id: 2,
      patientName: 'سارة خالد',
      doctorName: 'د. ليلى حسن',
      department: 'أسنان',
      date: '2024-01-20',
      time: '10:00',
      status: 'متاح',
      type: 'متابعة',
      phone: '0507654321'
    },
    {
      id: 3,
      patientName: 'أحمد محمد',
      doctorName: 'د. خالد العمري',
      department: 'قلب',
      date: '2024-01-20',
      time: '11:30',
      status: 'مكتمل',
      type: 'استشارة',
      phone: '0509876543'
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.includes(searchTerm) ||
      appointment.doctorName.includes(searchTerm) ||
      appointment.department.includes(searchTerm);
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && appointment.status === filter;
  });

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المواعيد</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          إضافة موعد جديد +
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="بحث في المواعيد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('متاح')}
            className={`px-4 py-2 rounded-lg ${filter === 'متاح' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            متاح
          </button>
          <button
            onClick={() => setFilter('محجوز')}
            className={`px-4 py-2 rounded-lg ${filter === 'محجوز' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            محجوز
          </button>
          <button
            onClick={() => setFilter('مكتمل')}
            className={`px-4 py-2 rounded-lg ${filter === 'مكتمل' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            مكتمل
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المريض</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطبيب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">القسم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوقت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                  <div className="text-sm text-gray-500">{appointment.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.doctorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {appointment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === 'متاح' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'محجوز' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 ml-4">عرض</button>
                  <button className="text-green-600 hover:text-green-900 ml-4">تعديل</button>
                  <button className="text-red-600 hover:text-red-900">إلغاء</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}