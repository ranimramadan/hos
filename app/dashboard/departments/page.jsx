'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DepartmentsPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

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
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (deptId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/departments/${deptId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setDepartments(departments.filter(dept => dept.id !== deptId));
      } catch (error) {
        console.error('Delete error:', error);
        alert('فشل في حذف القسم');
      }
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head_of_department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">الأقسام الطبية</h1>
        <Link 
          href="/dashboard/departments/add" 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          إضافة قسم جديد +
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="بحث في الأقسام..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${dept.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {dept.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>رئيس القسم: {dept.head_of_department}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{dept.location}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span>الرمز: {dept.code}</span>
                </div>

                <p className="text-gray-600 text-sm">{dept.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold text-blue-600">{dept.capacity}</div>
                    <div className="text-sm text-gray-500">السعة</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-green-600">{dept.users?.length || 0}</div>
                    <div className="text-sm text-gray-500">الموظفين</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2 flex-row-reverse">
              <Link 
                href={`/dashboard/departments/show/${dept.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                عرض التفاصيل
              </Link>
              <Link 
                href={`/dashboard/departments/edit/${dept.id}`}
                className="text-gray-600 hover:text-gray-900 mx-2"
              >
                تعديل
              </Link>
              <button 
                onClick={() => handleDelete(dept.id)}
                className="text-red-600 hover:text-red-900"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}