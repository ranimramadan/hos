'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';


export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState({});
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        profile_image: user.profile_image || '',
        role: user.role || ''
      });
    }
  }, []);

  const handleSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const updateData = { ...profileData };
      
      if (password) {
        updateData.password = password;
      }

      const response = await axios.put(`http://127.0.0.1:8000/api/users/${userData.id}`, updateData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        }
      });

      if (response.data.status) {
        localStorage.setItem('user', JSON.stringify({ 
          ...userData, 
          ...response.data.data 
        }));
        setIsEditing(false);
        setPassword('');
        setError({});
        alert('تم تحديث البيانات بنجاح');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      } else {
        alert('حدث خطأ أثناء تحديث البيانات');
      }
    }
  };

  if (!profileData) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {profileData?.profile_image ? (
                    <Image
                      src={`http://127.0.0.1:8000/api/profile-image/${profileData.profile_image.split('/').pop()}`}
                      alt={profileData.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-3xl">
                      {profileData?.name?.charAt(0) || 'م'}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{profileData?.name}</h1>
                  <p className="text-blue-100">{profileData?.role}</p>
                </div>
              </div>
              {/* Remove duplicate profile section and keep only the edit button */}
              <Link
                href="/dashboard/profile/edit"
                className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                تحديث البيانات
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">المعلومات الشخصية</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">الاسم</label>
                  <input
                    type="text"
                    value={profileData?.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profileData?.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={profileData?.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">العنوان</label>
                  <input
                    type="text"
                    value={profileData?.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  {error.address && <p className="text-red-500 text-sm">{error.address}</p>}
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة (اختياري)</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      placeholder="اترك فارغاً إذا لم ترد التغيير"
                    />
                    {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError({});
                    setPassword('');
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  إلغاء
                </button>
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