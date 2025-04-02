'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ShowDepartmentPage({ params }) {
  const router = useRouter();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          setDepartment(response.data.data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">تفاصيل القسم</h1>
          <button
            onClick={() => router.push('/dashboard/departments')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            العودة للقائمة
          </button>
        </div>

        {department && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{department.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  department.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {department.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">رمز القسم</h3>
                    <p className="mt-1 text-lg text-gray-900">{department.code}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">رئيس القسم</h3>
                    <p className="mt-1 text-lg text-gray-900">{department.head_of_department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">الموقع</h3>
                    <p className="mt-1 text-lg text-gray-900">{department.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">السعة</h3>
                    <p className="mt-1 text-lg text-gray-900">{department.capacity} سرير</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">تاريخ الإنشاء</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(department.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">آخر تحديث</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(department.updated_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">الوصف</h3>
                <p className="text-gray-900">{department.description}</p>
              </div>

              {department.users && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">الموظفون في القسم</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الاسم</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">البريد الإلكتروني</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الدور</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {department.users.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}