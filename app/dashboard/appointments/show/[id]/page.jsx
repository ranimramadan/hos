'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Add to imports
import Alert from '@/app/dashboard/components/Alert';

export default function ShowAppointmentPage({ params }) {
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add to state
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/appointments/${params.id}`);
        if (response.data && response.data.data) {
          setAppointment(response.data.data);
          setNotification({
            message: 'تم تحميل بيانات الموعد بنجاح',
            type: 'success'
          });
        }
      } catch (error) {
        setError('فشل في تحميل بيانات الموعد');
        setNotification({
          message: 'فشل في تحميل بيانات الموعد',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAppointment();
    }
  }, [params.id]);

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">تفاصيل الموعد</h1>
          <button
            onClick={() => router.push('/dashboard/appointments')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            العودة للقائمة
          </button>
        </div>

        {appointment && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">المريض</h3>
                    <p className="mt-1 text-lg text-gray-900">{appointment.patient?.name}</p>
                    <p className="text-sm text-gray-600">{appointment.patient?.phone}</p>
                    <p className="text-sm text-gray-600">{appointment.patient?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">الطبيب</h3>
                    <p className="mt-1 text-lg text-gray-900">{appointment.doctor?.name}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor?.phone}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">التاريخ</h3>
                    <p className="mt-1 text-lg text-gray-900">{appointment.date}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">الوقت</h3>
                    <p className="mt-1 text-lg text-gray-900">{appointment.time}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">الحالة</h3>
                    <span className={`mt-1 px-3 py-1 inline-flex text-sm font-semibold rounded-full
                      ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'}`}>
                      {getStatusInArabic(appointment.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}