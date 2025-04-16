'use client';
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, Phone, Mail, MapPin, Edit, FileText } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/patients/${userData.id}`,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userData.token}`,
              },
              withCredentials: true
            }
          );

          if (response.data.status) {
            const patientData = response.data.data;
            setUser(userData);
            setFormData(prev => ({
              ...prev,
              name: patientData.name,
              email: patientData.email,
              phone: patientData.phone,
              address: patientData.address,
              gender: patientData.gender,
              dateOfBirth: patientData.birth_date,
              profile_image: patientData.profile_image
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        toast.error('حدث خطأ أثناء جلب بيانات المريض');
      }
    };

    fetchPatientData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('حجم الصورة يجب أن لا يتجاوز 2 ميجابايت');
        return;
      }
      setProfileImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, profile_image: file }));
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const formDataToSend = new FormData();
      
      // إضافة طريقة PUT
      formDataToSend.append('_method', 'PUT');
      
      // إضافة التوكن
      formDataToSend.append('token', userData.token);
      
      // إضافة البيانات الشخصية
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      
      // إضافة البيانات الطبية
      formDataToSend.append('birth_date', formData.dateOfBirth);

      // إضافة بيانات تغيير كلمة المرور إذا تم إدخالها
      if (formData.current_password && formData.new_password) {
        formDataToSend.append('current_password', formData.current_password);
        formDataToSend.append('new_password', formData.new_password);
        formDataToSend.append('new_password_confirmation', formData.new_password_confirmation);
      }

      // إضافة الصورة إذا تم تحديثها
      if (formData.profile_image instanceof File) {
        formDataToSend.append('profile_image', formData.profile_image);
      }

      const response = await axios.post(
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
        toast.success('تم تحديث البيانات بنجاح', {
          duration: 3000,
          position: 'top-center',
        });

        // تحديث البيانات في localStorage
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          ...response.data.data.user,
          token: userData.token
        }));

        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء تحديث البيانات');
    }
  };

  // تعديل طريقة عرض الصورة
  const getImageUrl = (imagePath) => {
    if (formData.profile_image instanceof File) {
      return URL.createObjectURL(formData.profile_image);
    } else if (imagePath) {
      return `http://127.0.0.1:8000/api/profile-image/${imagePath.split('/').pop()}`;
    }
    return null;
  };
             // Add new state for medical records
             const [medicalRecords, setMedicalRecords] = useState(null);
              
             // Add new useEffect for fetching medical records
             useEffect(() => {
               const fetchMedicalRecords = async () => {
                 try {
                   const userData = JSON.parse(localStorage.getItem('user'));
                   if (userData) {
                     const response = await axios.get(
                       `http://127.0.0.1:8000/api/patients/${userData.id}/medical-records`,
                       {
                         headers: {
                           'Accept': 'application/json',
                           'Authorization': `Bearer ${userData.token}`,
                         },
                         withCredentials: true
                       }
                     );
                     
                     if (response.data.status) {
                       setMedicalRecords(response.data.data[0]);
                     }
                   }
                 } catch (error) {
                   console.error('Error fetching medical records:', error);
                   toast.error('حدث خطأ أثناء جلب السجلات الطبية');
                 }
               };
               
               fetchMedicalRecords();
             }, []);
  // Update the return JSX for the image
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-10">
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <label className="cursor-pointer block w-full h-full">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    {formData.profile_image ? (
                      <Image 
                        src={getImageUrl(formData.profile_image)} 
                        alt="Profile" 
                        width={128} 
                        height={128} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <User className="w-16 h-16 text-blue-500" />
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="space-y-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-3xl font-bold bg-transparent text-white border-b border-white"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white">{formData.name}</h1>
                )}
                <p className="text-blue-100">Patient ID: #{user?.id || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Date of Birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <InfoItem icon={Calendar} label="Date of Birth" value={formData.dateOfBirth || 'Not set'} />
                      <InfoItem icon={User} label="Gender" value={formData.gender || 'Not set'} />
                      <InfoItem icon={Phone} label="Phone" value={formData.phone || 'Not set'} />
                      <InfoItem icon={Mail} label="Email" value={formData.email} />
                      <InfoItem icon={MapPin} label="Address" value={formData.address || 'Not set'} />
                    </>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500">Current Password</label>
                      <input
                        type="password"
                        name="current_password"
                        value={formData.current_password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500">New Password</label>
                      <input
                        type="password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-500">Confirm New Password</label>
                      <input
                        type="password"
                        name="new_password_confirmation"
                        value={formData.new_password_confirmation}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {!isEditing && (
                <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Medical Information
                  </h2>
                  <div className="space-y-4">
                    <MedicalInfo label="Blood Type" value={medicalRecords?.blood_type || 'Not set'} />
                    <MedicalInfo label="Allergies" value={medicalRecords?.allergies || 'Not set'} />
                    <MedicalInfo label="Diagnosis" value={medicalRecords?.diagnosis || 'Not set'} />
                    <MedicalInfo label="Medications" value={medicalRecords?.medications || 'Not set'} />
                    <MedicalInfo label="Vital Signs" value={medicalRecords?.vital_signs || 'Not set'} />
                    <MedicalInfo label="Medical History" value={medicalRecords?.medical_history || 'Not set'} />
                    <MedicalInfo label="Notes" value={medicalRecords?.notes || 'Not set'} />
                    <MedicalInfo label="Last Updated" value={medicalRecords ? new Date(medicalRecords.updated_at).toLocaleDateString() : 'Not set'} />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-500 rounded-xl border-2 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-blue-500" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

const MedicalInfo = ({ label, value }) => (
  <div className="bg-blue-50 p-4 rounded-xl">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-700">{value || 'Not set'}</p>
  </div>
);

const MedicalInput = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-500">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default Profile;