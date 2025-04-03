'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Add to imports
import Alert from '@/app/components/Alert';

export default function EditAppointmentPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor_id: '',
    patient_id: '',
    status: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentRes, doctorsRes, patientsRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/appointments/${params.id}`),
          axios.get('http://127.0.0.1:8000/api/doctors'),
          axios.get('http://127.0.0.1:8000/api/patients')
        ]);

        if (appointmentRes.data && appointmentRes.data.data) {
          const appointment = appointmentRes.data.data;
          setFormData({
            date: appointment.date,
            time: appointment.time,
            doctor_id: appointment.doctor_id,
            patient_id: appointment.patient_id,
            status: appointment.status
          });
        }

        if (doctorsRes.data && doctorsRes.data.data) {
          setDoctors(doctorsRes.data.data);
        }

        if (patientsRes.data && patientsRes.data.data) {
          setPatients(patientsRes.data.data);
        }
      } catch (error) {
        setError('فشل في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Add to state
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/appointments/${params.id}`, formData);
      setNotification({
        message: 'تم تحديث الموعد بنجاح',
        type: 'success'
      });
      setTimeout(() => router.push('/dashboard/appointments'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'فشل في تحديث الموعد');
      setNotification({
        message: 'فشل في تحديث الموعد',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تعديل الموعد</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">التاريخ</label>
            <input
              type="date"
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

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-md text-white font-medium ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/dashboard/appointments')}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}