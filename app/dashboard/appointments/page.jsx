'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Alert from '@/app/components/Alert';

export default function AppointmentsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/appointments', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setAppointments(response.data.data);
        setNotification({
          message: 'تم تحميل المواعيد بنجاح',
          type: 'success'
        });
      }
    } catch (error) {
      setError('فشل في تحميل بيانات المواعيد');
      setNotification({
        message: 'فشل في تحميل بيانات المواعيد',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/appointments/${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setAppointments(appointments.filter(appointment => appointment.id !== id));
        setNotification({
          message: 'تم حذف الموعد بنجاح',
          type: 'success'
        });
      } catch (error) {
        setNotification({
          message: 'فشل في حذف الموعد',
          type: 'error'
        });
      }
    }
  };

  const getStatusInArabic = (status) => {
    const statusMap = {
      'pending': 'قيد الانتظار',
      'confirmed': 'مؤكد',
      'completed': 'مكتمل',
      'cancelled': 'ملغي'
    };
    return statusMap[status] || status;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      (appointment.patient?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.doctor?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && appointment.status === filter;
  });

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المواعيد</h1>
        <Link 
          href="/dashboard/appointments/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          إضافة موعد جديد +
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="بحث في المواعيد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            قيد الانتظار
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-lg ${filter === 'confirmed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            مؤكد
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            مكتمل
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المريض</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطبيب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الوقت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  لا توجد مواعيد متاحة
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patient?.name}</div>
                    <div className="text-sm text-gray-500">{appointment.patient?.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.doctor?.name}</div>
                    <div className="text-sm text-gray-500">{appointment.doctor?.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'}`}>
                      {getStatusInArabic(appointment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/dashboard/appointments/show/${appointment.id}`}
                      className="text-blue-600 hover:text-blue-900 ml-4"
                    >
                      عرض
                    </Link>
                    <Link 
                      href={`/dashboard/appointments/edit/${appointment.id}`}
                      className="text-green-600 hover:text-green-900 ml-4"
                    >
                      تعديل
                    </Link>
                    <button 
                      onClick={() => handleDelete(appointment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}