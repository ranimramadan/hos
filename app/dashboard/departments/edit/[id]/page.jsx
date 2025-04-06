'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';

export default function EditDepartmentPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    head_of_department: '',
    capacity: '',
    is_active: true
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/departments/${params.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data && response.data.data) {
          const dept = response.data.data;
          setFormData({
            name: dept.name,
            code: dept.code,
            description: dept.description,
            location: dept.location,
            head_of_department: dept.head_of_department,
            capacity: dept.capacity,
            is_active: dept.is_active
          });
        }
      } catch (error) {
        setError('فشل في تحميل بيانات القسم');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDepartment();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/departments/${params.id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      setNotification({
        message: 'تم تحديث القسم بنجاح',
        type: 'success'
      });
      setTimeout(() => router.push('/dashboard/departments'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'فشل في تحديث القسم');
      setNotification({
        message: 'فشل في تحديث القسم',
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تعديل بيانات القسم</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">اسم القسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">رمز القسم</label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">رئيس القسم</label>
            <input
              type="text"
              value={formData.head_of_department}
              onChange={(e) => setFormData({...formData, head_of_department: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الموقع</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">السعة</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              className="w-full p-2 border rounded-md"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label className="mr-2 text-gray-700">قسم نشط</label>
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
              onClick={() => router.push('/dashboard/departments')}
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