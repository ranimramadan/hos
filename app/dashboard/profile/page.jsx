'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);  // Add error state

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setProfileData({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          profile_image: user.profile_image,
          created_at: new Date(user.created_at).toLocaleDateString()
        });
      } catch (err) {
        setError('Error loading user data');
      }
    } else {
      setError('No user data found');
    }
  }, []);

  if (error) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
  // Add this function before the return statement
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const filename = imagePath.split('/').pop();
    return `http://127.0.0.1:8000/api/profile-image/${filename}`;
  };

  // Update the Image component
  console.log('Image Path:', profileData.profile_image);
  console.log('Image URL:', getImageUrl(profileData.profile_image));
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
              <div className="relative">
    {profileData?.profile_image ? (
      <Image
        src={getImageUrl(profileData.profile_image)}
        alt={profileData?.name}
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
                  <div className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                    {profileData.name}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <div className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                    {profileData.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <div className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                    {profileData.phone || 'غير محدد'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">العنوان</label>
                  <div className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                    {profileData.address || 'غير محدد'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">تاريخ الإنضمام</label>
                  <div className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                    {profileData.created_at}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}