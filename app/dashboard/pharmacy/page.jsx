'use client';
import { useState } from 'react';

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const medications = [
    {
      id: 1,
      name: 'Paracetamol',
      category: 'Pain Relief',
      manufacturer: 'Arab Pharmaceutical Co.',
      quantity: 500,
      price: 15,
      expiryDate: '2025-06',
      status: 'in-stock',
      description: 'Pain reliever and fever reducer'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      category: 'Antibiotics',
      manufacturer: 'East Pharma',
      quantity: 200,
      price: 45,
      expiryDate: '2024-12',
      status: 'low-stock',
      description: 'Broad-spectrum antibiotic'
    },
    {
      id: 3,
      name: 'Insulin',
      category: 'Hormones',
      manufacturer: 'Medical Pharma',
      quantity: 150,
      price: 120,
      expiryDate: '2024-09',
      status: 'in-stock',
      description: 'Diabetes treatment medication'
    }
  ];

  const categories = ['all', 'Pain Relief', 'Antibiotics', 'Hormones', 'Vitamins'];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <span className="text-blue-600 text-3xl">💊</span>
              Pharmacy Management
            </h1>
            <p className="text-gray-500">Manage and monitor medication inventory</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Medication
          </button>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 backdrop-blur-lg bg-opacity-90">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                
                <input
                  type="search"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search medications by name or manufacturer..."
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
                // Change category filter buttons color
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    filterCategory === category 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Medications' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Medications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medications.map((med) => (
            <div key={med.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                    med.status === 'in-stock' ? 'bg-blue-100 text-blue-800' : 
                    med.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {med.status === 'in-stock' ? 'In Stock' : 
                     med.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Category</span>
                    <span className="text-gray-900 font-semibold">{med.category}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Price</span>
                    <span className="text-gray-900 font-semibold">${med.price}</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Quantity</span>
                    <span className="text-gray-900 font-semibold">{med.quantity} units</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-1">Expiry Date</span>
                    <span className="text-gray-900 font-semibold">{med.expiryDate}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <span className="text-gray-500 text-sm block mb-2">Manufacturer</span>
                  <p className="text-gray-900 font-medium">{med.manufacturer}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-500 text-sm block mb-2">Description</span>
                  <p className="text-gray-900">{med.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 flex justify-end gap-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Update Stock
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  Edit
                </button>
                <button className="px-4 py-2 text-red-600 hover:text-red-800 transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}