import React from 'react';
import Image from 'next/image';
import { Linkedin, Youtube, Facebook, MapPin, GraduationCap, Stethoscope } from 'lucide-react';
import BookAppointment from './BookAppointment';

function DoctorDetail({ doctorInfo }) {
  return (
    <div className="col-span-2">
      <h2 className="text-4xl font-bold  mb-8">
        Detail<span className="text-blue-500"> Doctors </span>
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-64 h-64 bg-blue-100 rounded-xl p-4">
            <Image 
              src={doctorInfo.image} 
              alt={doctorInfo.name} 
              width={300} 
              height={300} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{doctorInfo.name}</h1>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Stethoscope className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Experience</p>
                  <p className="text-gray-800">{doctorInfo.experience}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <GraduationCap className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Specialty</p>
                  <p className="text-gray-800">{doctorInfo.specialty}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                <Linkedin size={24} className="text-blue-600" />
              </a>
              <a href="#" className="bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors">
                <Youtube size={24} className="text-red-600" />
              </a>
              <a href="#" className="bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                <Facebook size={24} className="text-blue-800" />
              </a>
            </div>

            <BookAppointment doctorInfo={doctorInfo} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          {doctorInfo.description || 
           ` ${doctorInfo.name} is a highly experienced ${doctorInfo.specialty} with ${doctorInfo.experience} of experience in the medical field. 
            Dedicated to providing exceptional patient care and utilizing the latest medical advancements in treatments.`
          }
        </p>
      </div>
    </div>
  );
}

export { DoctorDetail };