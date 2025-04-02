'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

export default function EditDoctorPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    department_id: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse, departmentsResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/doctors/${params.id}`),
          axios.get('http://127.0.0.1:8000/api/departments')
        ]);

        if (doctorResponse.data && doctorResponse.data.data) {
          const doctor = doctorResponse.data.data;
          setFormData({
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            address: doctor.address,
            department_id: doctor.department_id
          });
          // Set image preview if doctor has an image
          if (doctor.image_url) {
            setImagePreview(doctor.image_url);
          }
        }

        if (departmentsResponse.data && departmentsResponse.data.data) {
          setDepartments(departmentsResponse.data.data);
        }
      } catch (error) {
        setError('فشل في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/doctors/${params.id}`, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      router.push('/dashboard/doctors');
    } catch (error) {
      setError(error.response?.data?.message || 'فشل في تحديث بيانات الطبيب');
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
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">تعديل بيانات الطبيب</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {/* Add image display section */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Doctor's profile"
                  fill
                  className="object-cover"
                  onError={() => setImagePreview('/images/default-doctor.png')}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">{formData.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

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
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
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