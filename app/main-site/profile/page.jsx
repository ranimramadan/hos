'use client';
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, Phone, Mail, MapPin, Edit, FileText } from 'lucide-react';
import Image from 'next/image';

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
    bloodType: '',
    allergies: '',
    weight: '',
    height: '',
  });

  useEffect(() => {
    // جلب بيانات المستخدم من localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const savedImage = localStorage.getItem('profileImage');

    if (userData) {
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        ...profileData,
        name: userData.name,
        email: userData.email,
      }));
    }
    
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfileImage(imageData);
        localStorage.setItem('profileImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    try {
      // حفظ البيانات في localStorage
      localStorage.setItem('profileData', JSON.stringify(formData));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-10">
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <label className="cursor-pointer block w-full h-full">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <Image src={profileImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover rounded-full" />
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
                      <InfoItem icon={Phone} label="Phone" value={formData.phone || 'Not set'} />
                      <InfoItem icon={Mail} label="Email" value={formData.email} />
                      <InfoItem icon={MapPin} label="Address" value={formData.address || 'Not set'} />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Medical Information
                </h2>
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <MedicalInput label="Blood Type" name="bloodType" value={formData.bloodType} onChange={handleInputChange} />
                      <MedicalInput label="Allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} />
                      <MedicalInput label="Weight (kg)" name="weight" value={formData.weight} onChange={handleInputChange} type="number" />
                      <MedicalInput label="Height (cm)" name="height" value={formData.height} onChange={handleInputChange} type="number" />
                    </>
                  ) : (
                    <>
                      <MedicalInfo label="Blood Type" value={formData.bloodType} />
                      <MedicalInfo label="Allergies" value={formData.allergies} />
                      <MedicalInfo label="Weight" value={formData.weight ? `${formData.weight} kg` : 'Not set'} />
                      <MedicalInfo label="Height" value={formData.height ? `${formData.height} cm` : 'Not set'} />
                    </>
                  )}
                </div>
              </div>
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