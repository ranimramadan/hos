'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    department_id: '',
    role: 'doctor'
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/departments', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          setDepartments(response.data.data);
        }
      } catch (error) {
        setError('فشل في تحميل بيانات الأقسام');
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/doctors', formData);
      setNotification({
        message: 'تم إضافة الطبيب بنجاح',
        type: 'success'
      });
      setTimeout(() => router.push('/dashboard/doctors'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'فشل في إضافة الطبيب');
      setNotification({
        message: 'فشل في إضافة الطبيب',
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">إضافة طبيب جديد</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">العنوان</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">القسم</label>
            <select
              value={formData.department_id}
              onChange={(e) => setFormData({...formData, department_id: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">اختر القسم</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
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
              {loading ? 'جاري الإضافة...' : 'إضافة الطبيب'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/dashboard/doctors')}
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