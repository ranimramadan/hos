'use client';
import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'د. محمد أحمد',
    specialization: 'طب عام',
    email: 'dr.mohammad@hospital.com',
    phone: '0501234567',
    department: 'قسم الطوارئ',
    joinDate: '2020-01-15',
    licenseNumber: 'MD123456',
    education: 'دكتوراه في الطب - جامعة الملك سعود',
    experience: '10 سنوات',
    avatar: '/default-avatar.png'
  });

  const handleSave = () => {
    setIsEditing(false);
    // هنا يتم حفظ البيانات
    alert('تم حفظ التغييرات بنجاح');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-500 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-blue-100">{profileData.specialization}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {isEditing ? 'إلغاء' : 'تعديل'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">المعلومات الشخصية</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">القسم</label>
                  <input
                    type="text"
                    value={profileData.department}
                    onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">المعلومات المهنية</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">رقم الترخيص</label>
                  <input
                    type="text"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">المؤهل العلمي</label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">سنوات الخبرة</label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  حفظ التغييرات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}