'use client';
import { useState } from 'react';

export default function LaboratoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const labTests = [
    {
      id: 1,
      name: 'تحليل الدم الكامل (CBC)',
      category: 'تحاليل الدم',
      price: 80,
      duration: '60 دقيقة',
      status: 'متاح',
      description: 'فحص شامل لمكونات الدم',
      requirements: 'صيام 8 ساعات',
      department: 'قسم أمراض الدم'
    },
    {
      id: 2,
      name: 'وظائف الكبد',
      category: 'تحاليل الكبد',
      price: 120,
      duration: '90 دقيقة',
      status: 'متاح',
      description: 'فحص وظائف الكبد الأساسية',
      requirements: 'صيام 12 ساعة',
      department: 'قسم الجهاز الهضمي'
    },
    {
      id: 3,
      name: 'فحص الغدة الدرقية',
      category: 'تحاليل الغدد',
      price: 150,
      duration: '120 دقيقة',
      status: 'قيد الصيانة',
      description: 'قياس مستويات هرمونات الغدة الدرقية',
      requirements: 'لا يتطلب صيام',
      department: 'قسم الغدد الصماء'
    }
  ];

  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.name.includes(searchTerm) ||
      test.category.includes(searchTerm) ||
      test.department.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">المختبر والتحاليل الطبية</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          إضافة تحليل جديد +
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="بحث في التحاليل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterStatus('متاح')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'متاح' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            متاح
          </button>
          <button
            onClick={() => setFilterStatus('قيد الصيانة')}
            className={`px-4 py-2 rounded-lg ${filterStatus === 'قيد الصيانة' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            قيد الصيانة
          </button>
        </div>
      </div>

      {/* Lab Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{test.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${test.status === 'متاح' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {test.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">القسم:</span>
                  <span className="text-gray-900">{test.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">التصنيف:</span>
                  <span className="text-gray-900">{test.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">السعر:</span>
                  <span className="text-gray-900">{test.price} ₪</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المدة:</span>
                  <span className="text-gray-900">{test.duration}</span>
                </div>
                <div className="mt-3">
                  <span className="text-gray-500 text-sm">المتطلبات:</span>
                  <p className="text-gray-900 text-sm mt-1">{test.requirements}</p>
                </div>
                <div className="mt-3">
                  <span className="text-gray-500 text-sm">الوصف:</span>
                  <p className="text-gray-900 text-sm mt-1">{test.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2 flex-row-reverse">
              <button className="text-blue-600 hover:text-blue-900">طلب تحليل</button>
              <button className="text-gray-600 hover:text-gray-900 mx-2">تعديل</button>
              <button className="text-red-600 hover:text-red-900">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}