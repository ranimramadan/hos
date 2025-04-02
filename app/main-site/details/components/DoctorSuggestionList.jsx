"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function DoctorSuggestionList() {
  const router = useRouter();
  const suggestions = [
    { name: "Dr. Jane Cooper", specialty: "Neurologist", experience: "12 Years", image: "/images/doc5.png" },
    { name: "Dr. Tom Cook", specialty: "Neurologist", experience: "20 Years", image: "/images/doc6.png" },
    { name: "Dr. Alex Johnson", specialty: "Cardiologist", experience: "15 Years", image: "/images/doc7.png" },
    { name: "Dr. Sarah White", specialty: "Dermatologist", experience: "10 Years", image: "/images/doc8.png" },
    { name: "Dr. Mark Lee", specialty: "General Physician", experience: "18 Years", image: "/images/doc9.png" },
    { name: "Dr. Emily Davis", specialty: "Pediatrician", experience: "14 Years", image: "/images/doc10.png" },
    { name: "Dr. David Brown", specialty: "Gastroenterologist", experience: "16 Years", image: "/images/doc11.png" },
    { name: "Dr. Olivia Wilson", specialty: "Otolaryngologist", experience: "13 Years", image: "/images/doc12.png" },
    { name: "Dr. Michael Scott", specialty: "Orthopedic", experience: "17 Years", image: "/images/doc13.png" },
    { name: "Dr. Anna Roberts", specialty: "Pulmonologist", experience: "19 Years", image: "/images/doc14.png" }
  ];

  const handleDoctorClick = (doctor) => {
    router.push(`/main-site/doctor-detail?name=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&experience=${encodeURIComponent(doctor.experience)}&image=${encodeURIComponent(doctor.image)}`);
  };

  return (
    <div className='bg-white p-5 rounded-lg shadow-md'>
      <h3 className='font-bold text-xl mb-4'>Suggestions</h3>
      <div className='space-y-4 max-h-[600px] overflow-y-auto'>
        {suggestions.map((doctor, index) => (
          <div 
            key={index} 
            className='p-4 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer bg-white shadow-sm'
            onClick={() => handleDoctorClick(doctor)}
          >
            <div className='flex items-center space-x-3'>
              <div className="w-[50px] h-[50px] bg-blue-100 rounded-full flex items-center justify-center">
                <Image 
                  src={doctor.image} 
                  alt={doctor.name} 
                  width={50} 
                  height={50} 
                  className='rounded-full w-[45px] h-[45px] object-cover'
                />
              </div>
              <div>
                <h4 className='font-bold'>{doctor.name}</h4>
                <p className='text-gray-500 text-sm'>{doctor.specialty}</p>
                <p className='text-gray-600 text-xs'>{doctor.experience}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorSuggestionList;
