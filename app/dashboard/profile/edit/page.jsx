'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profile_image: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        profile_image: user.profile_image || ''
      });
    }
  }, []);

 

  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          setErrors(prev => ({ ...prev, profile_image: 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت' }));
          return;
        }
        setSelectedImage(URL.createObjectURL(file));
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, profile_image: file }));
        };
        reader.readAsDataURL(file);
      }
    };
  
  const validateForm = () => {
      const errors = {};
      
      // Name validation
      if (formData.name && formData.name.length > 255) {
        errors.name = 'يجب أن لا يتجاوز الاسم 255 حرف';
      }
  
      // Email validation
      if (formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          errors.email = 'البريد الإلكتروني غير صالح';
        }
      }
  
      // Phone validation
      if (formData.phone && formData.phone.length > 20) {
        errors.phone = 'رقم الهاتف غير صالح';
      }
  
      // Address validation
      if (formData.address && formData.address.length > 1000) {
        errors.address = 'العنوان طويل جداً';
      }
  
      // Profile image validation
      if (formData.profile_image instanceof File) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
        if (!allowedTypes.includes(formData.profile_image.type)) {
          errors.profile_image = 'يجب أن تكون الصورة من نوع: jpeg, png, jpg, gif, svg';
        }
        if (formData.profile_image.size > 2048 * 1024) { // 2MB
          errors.profile_image = 'يجب أن لا يتجاوز حجم الصورة 2 ميجابايت';
        }
      }
  
      return errors;
    };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const formDataToSend = new FormData();
      
      // إضافة طريقة PUT
      formDataToSend.append('_method', 'PUT');
      
      // إضافة البيانات
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);

      if (formData.profile_image instanceof File) {
        formDataToSend.append('profile_image', formData.profile_image);
      }

      const response = await axios.post(  // تغيير من put إلى post
        `http://127.0.0.1:8000/api/users/${userData.id}`,
        formDataToSend,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );
  
      if (response.data.status) {
        // Show success message
        toast.success(response.data.message, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: '#fff',
            direction: 'rtl'
          }
        });

        localStorage.setItem('user', JSON.stringify({
          ...userData,
          ...response.data.data.user,
          token: userData.token
        }));
        
        // Delay navigation to show the toast
        setTimeout(() => {
          router.push('/dashboard/profile');
        }, 1000);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle Laravel validation errors
        const serverErrors = {};
        Object.keys(error.response.data.errors).forEach(key => {
          // Get all error messages for each field
          serverErrors[key] = error.response.data.errors[key].join(', ');
        });
        setErrors(serverErrors);
      } else if (error.response?.data?.message) {
        // Handle single error message
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: 'حدث خطأ أثناء تحديث البيانات' });
      }
    } finally {
      setLoading(false);
    }
  };
  const getImageSrc = () => {
    if (formData.profile_image instanceof File) {
      return URL.createObjectURL(formData.profile_image);
    } else if (formData.profile_image) {
      return `http://127.0.0.1:8000/api/profile-image/${formData.profile_image.split('/').pop()}`;
    }
    return null;
  };
  return (
    <div className="p-6">
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">تحديث البيانات الشخصية</h1>
          
          <div className="mb-6 flex flex-col items-center">

            
            <div className="relative mb-4">
              {getImageSrc() ? (
                <Image
                  src={getImageSrc()}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl">
                  {formData.name?.charAt(0) || 'م'}
                </div>
              )}
              
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            </div>
            {errors.profile_image && (
              <p className="text-red-500 text-sm">{errors.profile_image}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                العنوان
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/dashboard/profile')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'جاري التحديث...' : 'حفظ التغييرات'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}