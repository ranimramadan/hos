'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor_id: '',
    patient_id: '',
    status: 'pending'
  });

  // Get tomorrow's date in YYYY-MM-DD format
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
  });
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // First get CSRF cookie
        await api.get('/sanctum/csrf-cookie');
        const response = await api.get('/api/users/test');
        if (response.data.status) {
          const users = response.data.data.users;
          setDoctors(users.filter(user => user.role === 'doctor'));
          setPatients(users.filter(user => user.role === 'patient'));
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
  
    try {
      // First get CSRF cookie
      await api.get('/sanctum/csrf-cookie');
      const response = await api.post('/api/appointments', formData);
  
      if (response.data.status) {
        setSuccess(true);
        setFormData({
          date: '',
          time: '',
          doctor_id: '',
          patient_id: '',
          status: 'pending'
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'حدث خطأ في إنشاء الموعد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">حجز موعد جديد</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            تم حجز الموعد بنجاح
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">التاريخ</label>
            <input
              type="date"
              min={minDate}
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الوقت</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الطبيب</label>
            <select
              value={formData.doctor_id}
              onChange={(e) => setFormData({...formData, doctor_id: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">اختر الطبيب</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">المريض</label>
            <select
              value={formData.patient_id}
              onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">اختر المريض</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الحالة</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'جاري الحجز...' : 'حجز الموعد'}
          </button>
        </form>
      </div>
    </div>
  );
}