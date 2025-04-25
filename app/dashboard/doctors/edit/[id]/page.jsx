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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-blue-600 text-2xl">👨‍⚕️</span>
            تعديل بيانات الطبيب
          </h1>
          <p className="text-gray-600 mt-2">قم بتحديث معلومات الطبيب</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Doctor's profile"
                  fill
                  className="object-cover"
                  onError={() => setImagePreview('/images/default-doctor.png')}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <span className="text-blue-600 text-5xl font-semibold">{formData.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">الاسم</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                placeholder="أدخل اسم الطبيب"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">رقم الهاتف</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
                placeholder="05xxxxxxxx"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">القسم</label>
              <select
                value={formData.department_id}
                onChange={(e) => setFormData({...formData, department_id: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">العنوان</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="3"
                required
                placeholder="أدخل العنوان بالتفصيل"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 transform hover:-translate-y-0.5 ${
                loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/dashboard/doctors')}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}