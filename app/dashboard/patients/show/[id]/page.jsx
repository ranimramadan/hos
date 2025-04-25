'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';

export default function ShowPatientPage({ params }) {
  const router = useRouter();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const patientId = React.use(params).id;  // Unwrap params using React.use()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/patients/${patientId}`, {
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

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);  // Update dependency array to use patientId

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-blue-600 text-2xl">👤</span>
              تفاصيل المريض
            </h1>
            <p className="text-gray-600 mt-2">عرض المعلومات الكاملة للمريض</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/patients')}
            className="bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            العودة للقائمة
          </button>
        </div>

        {patient && (
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl transform hover:scale-105 transition duration-300">
                  <Image
                    src={patient.image_url || '/images/default-patient.png'}
                    alt={patient.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = '/images/default-patient.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">الاسم</h3>
                  <p className="text-xl font-semibold text-gray-900">{patient.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">البريد الإلكتروني</h3>
                  <p className="text-xl font-semibold text-gray-900">{patient.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">رقم الهاتف</h3>
                  <p className="text-xl font-semibold text-gray-900">{patient.phone}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">العنوان</h3>
                  <p className="text-xl font-semibold text-gray-900">{patient.address}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">تاريخ التسجيل</h3>
                  <p className="text-xl font-semibold text-gray-900">
                    {new Date(patient.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">آخر تحديث</h3>
                  <p className="text-xl font-semibold text-gray-900">
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