'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@/app/dashboard/components/Alert';
import Loading from '@/app/dashboard/components/loading';
// Add useRouter import at the top
import { useRouter } from 'next/navigation';

export default function PharmacyPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/pharmacy', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.data) {
        setMedications(response.data.data);
        setNotification({
          message: 'تم تحميل بيانات الأدوية بنجاح',
          type: 'success'
        });
      }
    } catch (error) {
      setError('Failed to load medications data');
      setNotification({
        message: 'فشل في تحميل بيانات الأدوية',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from medications
  const categories = ['all', ...new Set(medications.map(med => med.category))];

  // Move getFilteredMedications outside of render
  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Format date safely
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleDelete = async (medId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدواء؟')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/pharmacy/${medId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setMedications(medications.filter(med => med.id !== medId));
        setNotification({
          message: 'تم حذف الدواء بنجاح',
          type: 'success'
        });
      } catch (error) {
        setNotification({
          message: 'فشل في حذف الدواء',
          type: 'error'
        });
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <Alert
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        
        {/* Header section remains the same */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <span className="text-blue-600 text-3xl">💊</span>
              إدارة الصيدلية
            </h1>
            <p className="text-gray-500">إدارة ومراقبة مخزون الأدوية</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/pharmacy/add')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة دواء جديد
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 backdrop-blur-lg bg-opacity-90">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="search"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="البحث عن الأدوية باسم الدواء أو الشركة المصنعة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    filterCategory === category 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'جميع الأدوية' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedications.map((med) => (
            <div key={med.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                    med.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {med.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">التصنيف</span>
                    <span className="text-gray-900 font-semibold">{med.category}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">السعر</span>
                    <span className="text-gray-900 font-semibold">₪{med.price}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">المخزون</span>
                    <span className="text-gray-900 font-semibold">{med.stock_quantity} وحدة</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">تاريخ الانتهاء</span>
                    <span className="text-gray-900 font-semibold">
                      {formatDate(med.expiry_date)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <span className="text-gray-500 text-sm block mb-2">الاسم العلمي</span>
                  <p className="text-gray-900 font-medium">{med.generic_name}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <span className="text-gray-500 text-sm block mb-2">الشركة المصنعة</span>
                  <p className="text-gray-900 font-medium">{med.manufacturer}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-500 text-sm block mb-2">الوصف</span>
                  <p className="text-gray-900">{med.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 flex justify-end gap-4 border-t">
                <button 
                  onClick={() => router.push(`/dashboard/pharmacy/edit/${med.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تعديل
                </button>
                <button 
                  onClick={() => handleDelete(med.id)}
                  className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}