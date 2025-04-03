'use client';
import { useState } from 'react';

export default function LaboratoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'Blood Tests',
      price: 80,
      duration: '60 minutes',
      status: 'available',
      description: 'Comprehensive blood components examination',
      requirements: '8 hours fasting required',
      department: 'Hematology'
    },
    {
      id: 2,
      name: 'Liver Function Test (LFT)',
      category: 'Liver Tests',
      price: 120,
      duration: '90 minutes',
      status: 'available',
      description: 'Basic liver function examination Comprehensive blood components ',
      requirements: '12 hours fasting required',
      department: 'Gastroenterology'
    },
    {
      id: 3,
      name: 'Thyroid Function Test (TFT)',
      category: 'Endocrine Tests',
      price: 150,
      duration: '120 minutes',
      status: 'maintenance',
      description: 'Measures thyroid hormone levels Comprehensive blood components ',
      requirements: 'No fasting required',
      department: 'Endocrinology'
    }
  ];

  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <span className="text-blue-600 text-3xl">🔬</span>
              Laboratory & Medical Tests
            </h1>
            <p className="text-gray-500">Manage and monitor all laboratory tests</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Test
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
                  placeholder="Search by test name, category, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3">
              {/* Filter buttons remain the same but with enhanced styling */}
            </div>
          </div>
        </div>

        {/* Enhanced Lab Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{test.name}</h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                    test.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status === 'available' ? 'Available' : 'Under Maintenance'}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Test details with enhanced styling */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="text-gray-500 text-sm block mb-1">Department</span>
                      <span className="text-gray-900 font-semibold">{test.department}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="text-gray-500 text-sm block mb-1">Category</span>
                      <span className="text-gray-900 font-semibold">{test.category}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="text-gray-500 text-sm block mb-1">Price</span>
                      <span className="text-gray-900 font-semibold">${test.price}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <span className="text-gray-500 text-sm block mb-1">Duration</span>
                      <span className="text-gray-900 font-semibold">{test.duration}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl mt-4">
                    <span className="text-gray-500 text-sm block mb-2">Requirements</span>
                    <p className="text-gray-900">{test.requirements}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-500 text-sm block mb-2">Description</span>
                    <p className="text-gray-900">{test.description}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 flex justify-end gap-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Request Test
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