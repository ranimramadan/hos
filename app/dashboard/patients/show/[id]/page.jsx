'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';

export default function ShowPatientPage({ params }) {
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          setPatient(response.data.data);
          setNotification({
            message: 'تم تحميل بيانات المريض بنجاح',
            type: 'success'
          });
        }
      } catch (error) {
        setError('فشل في تحميل بيانات المريض');
        setNotification({
          message: 'فشل في تحميل بيانات المريض',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPatient();
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
          <h1 className="text-2xl font-bold text-gray-800">تفاصيل المريض</h1>
          <button
            onClick={() => router.push('/dashboard/patients')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            العودة للقائمة
          </button>
        </div>

        {patient && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={patient.image_url || '/images/default-patient.png'}
                  alt={patient.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/images/default-patient.png';
                  }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">الاسم</h3>
                  <p className="mt-1 text-lg text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
                  <p className="mt-1 text-lg text-gray-900">{patient.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">رقم الهاتف</h3>
                  <p className="mt-1 text-lg text-gray-900">{patient.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">العنوان</h3>
                  <p className="mt-1 text-lg text-gray-900">{patient.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">تاريخ التسجيل</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(patient.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">آخر تحديث</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(patient.updated_at).toLocaleDateString('ar-SA')}
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