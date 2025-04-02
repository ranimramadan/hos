'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function PatientHomePage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchAppointments();
    }
  }, []);

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      const response = await api.get('/api/patient/appointments');
      if (response.data.data) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      setError('فشل في تحميل المواعيد');
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Welcome Banner */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            مرحباً، {user?.name}
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/appointments/book"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 text-center"
            >
              حجز موعد جديد
            </Link>
            <Link 
              href="/medical-records"
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 text-center"
            >
              السجل الطبي
            </Link>
            <Link 
              href="/profile"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-6 text-center"
            >
              الملف الشخصي
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">المواعيد القادمة</h2>
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">الطبيب: {appointment.doctor?.name}</p>
                      <p className="text-gray-600">التاريخ: {appointment.date}</p>
                      <p className="text-gray-600">الوقت: {appointment.time}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {appointment.status === 'confirmed' ? 'مؤكد' : 
                         appointment.status === 'pending' ? 'قيد الانتظار' : 'ملغي'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">لا توجد مواعيد قادمة</p>
          )}
        </div>

        {/* Recent Medical Records */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">آخر السجلات الطبية</h2>
          <div className="text-center">
            <Link 
              href="/medical-records"
              className="text-blue-500 hover:text-blue-600"
            >
              عرض السجل الطبي الكامل
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}