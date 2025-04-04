'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/components/Alert';

export default function ShowDoctorPage({ params }) {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/doctors/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          setDoctor(response.data.data);
          setNotification({
            message: 'تم تحميل بيانات الطبيب بنجاح',
            type: 'success'
          });
        }
      } catch (error) {
        setError('فشل في تحميل بيانات الطبيب');
        setNotification({
          message: 'فشل في تحميل بيانات الطبيب',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDoctor();
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
          <h1 className="text-2xl font-bold text-gray-800">تفاصيل الطبيب</h1>
          <button
            onClick={() => router.push('/dashboard/doctors')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            العودة للقائمة
          </button>
        </div>

        {doctor && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                {doctor.name.charAt(0)}
              </div>
              <div className="mr-6">
                <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                <p className="text-lg text-gray-600">{doctor.department?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
                  <p className="mt-1 text-lg text-gray-900">{doctor.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">رقم الهاتف</h3>
                  <p className="mt-1 text-lg text-gray-900">{doctor.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">العنوان</h3>
                  <p className="mt-1 text-lg text-gray-900">{doctor.address}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">القسم</h3>
                  <p className="mt-1 text-lg text-gray-900">{doctor.department?.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">رمز القسم</h3>
                  <p className="mt-1 text-lg text-gray-900">{doctor.department?.code}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">تاريخ التسجيل</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(doctor.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}