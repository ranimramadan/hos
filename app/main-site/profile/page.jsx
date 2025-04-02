'use client';
import React from 'react';
import { User, Calendar, Clock, Phone, Mail, MapPin, Edit, FileText } from 'lucide-react';

function Profile() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header with enhanced design */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-10">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <User className="w-16 h-16 text-blue-500" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white">John Doe</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                  Active Patient ID: #123456
                </p>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 px-8 py-4 bg-blue-50">
            <div className="text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-gray-600">Total Visits</p>
            </div>
            <div className="text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
              <p className="text-2xl font-bold text-blue-600">4</p>
              <p className="text-gray-600">Upcoming</p>
            </div>
            <div className="text-center p-4 hover:bg-white rounded-xl transition-colors duration-300">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-gray-600">Reports</p>
            </div>
          </div>

          {/* Profile Information with enhanced styling */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-700">15 March 1990</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700">+1 234 567 890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-700">123 Medical Street, Health City</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Medical Information
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                    <p className="text-sm text-gray-500">Blood Type</p>
                    <p className="text-lg font-semibold text-gray-700">A+</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                    <p className="text-sm text-gray-500">Allergies</p>
                    <p className="text-lg font-semibold text-gray-700">None</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="text-lg font-semibold text-gray-700">75 kg</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors duration-300">
                    <p className="text-sm text-gray-500">Height</p>
                    <p className="text-lg font-semibold text-gray-700">175 cm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments with enhanced design */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Calendar className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">General Checkup</h3>
                        <p className="text-gray-500">Dr. Sarah Wilson</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-500">Tomorrow</p>
                      <p className="text-gray-500">10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons with enhanced styling */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-500 rounded-xl border-2 border-blue-500 hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300">
                <FileText className="w-4 h-4" />
                Medical Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;