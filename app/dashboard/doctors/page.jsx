'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Alert from '@/app/components/Alert';
import Loading from '@/app/dashboard/loading';


export default function DoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctors', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setDoctors(response.data.data);
        setNotification({
          message: 'تم تحميل بيانات الأطباء بنجاح',
          type: 'success'
        });
      }
    } catch (error) {
      setError('Failed to load doctors data');
      setNotification({
        message: 'فشل في تحميل بيانات الأطباء',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطبيب؟')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/doctors/${doctorId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
        setNotification({
          message: 'تم حذف الطبيب بنجاح',
          type: 'success'
        });
      } catch (error) {
        setNotification({
          message: 'فشل في حذف الطبيب',
          type: 'error'
        });
      }
    }
  };

  // Add the filtering function
  const getFilteredDoctors = () => {
    return doctors.filter(doctor =>
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return (
<Loading />
    );
  }

  const filteredDoctors = getFilteredDoctors();

  return (
    <div className="p-6">
      {notification && (
        <Alert
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
            <span className="text-blue-600 text-3xl">👨‍⚕️</span>
            قائمة الأطباء
          </h1>
          <p className="text-gray-500">إدارة ومتابعة الأطباء في المستشفى</p>
        </div>
        <Link
          href="/dashboard/doctors/add"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة طبيب جديد
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="بحث عن طبيب..."
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
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {doctor.name.charAt(0)}
              </div>
              <div className="mr-4">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.department?.name}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">القسم:</span>
                <span className="text-gray-900">{doctor.department?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الهاتف:</span>
                <span className="text-gray-900">{doctor.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">البريد:</span>
                <span className="text-gray-900">{doctor.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">العنوان:</span>
                <span className="text-gray-900">{doctor.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {doctor.department?.code}
                </span>
                <div className="space-x-2 flex flex-row-reverse">
                  <Link 
                    href={`/dashboard/doctors/show/${doctor.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    عرض
                  </Link>
                  <Link 
                    href={`/dashboard/doctors/edit/${doctor.id}`}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    تعديل
                  </Link>
                  <button 
                    onClick={() => handleDelete(doctor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}