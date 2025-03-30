'use client';
import { useState } from 'react';

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const medications = [
    {
      id: 1,
      name: 'باراسيتامول',
      category: 'مسكنات',
      manufacturer: 'شركة الدواء العربية',
      quantity: 500,
      price: 15,
      expiryDate: '2025-06',
      status: 'متوفر',
      description: 'مسكن للألم وخافض للحرارة'
    },
    {
      id: 2,
      name: 'أموكسيسيلين',
      category: 'مضادات حيوية',
      manufacturer: 'فارما الشرق',
      quantity: 200,
      price: 45,
      expiryDate: '2024-12',
      status: 'منخفض',
      description: 'مضاد حيوي واسع الطيف'
    },
    {
      id: 3,
      name: 'إنسولين',
      category: 'هرمونات',
      manufacturer: 'ميديكال فارما',
      quantity: 150,
      price: 120,
      expiryDate: '2024-09',
      status: 'متوفر',
      description: 'لعلاج مرضى السكري'
    }
  ];

  const categories = ['all', 'مسكنات', 'مضادات حيوية', 'هرمونات', 'فيتامينات'];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = 
      med.name.includes(searchTerm) ||
      med.manufacturer.includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || med.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة الصيدلية</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          إضافة دواء جديد +
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="search"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="بحث عن دواء..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap
                ${filterCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {category === 'all' ? 'جميع الأدوية' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedications.map((med) => (
          <div key={med.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{med.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${med.status === 'متوفر' ? 'bg-green-100 text-green-800' : 
                    med.status === 'منخفض' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {med.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">التصنيف:</span>
                  <span className="text-gray-900">{med.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الشركة المصنعة:</span>
                  <span className="text-gray-900">{med.manufacturer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الكمية المتوفرة:</span>
                  <span className="text-gray-900">{med.quantity} وحدة</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">السعر:</span>
                  <span className="text-gray-900">{med.price} ₪</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">تاريخ الانتهاء:</span>
                  <span className="text-gray-900">{med.expiryDate}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{med.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2 flex-row-reverse">
              <button className="text-blue-600 hover:text-blue-900">تحديث المخزون</button>
              <button className="text-gray-600 hover:text-gray-900 mx-2">تعديل</button>
              <button className="text-red-600 hover:text-red-900">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}