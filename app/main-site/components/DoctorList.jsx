"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from 'next/navigation';

const doctors = [
  { 
    name: "Dr. Jane Cooper", 
    specialty: "Neurologist", 
    experience: "12 Years", 
    description: "Specialist in dental surgery and cosmetic treatments.", 
    image: "/images/doc5.png" 
  },
  { 
    name: "Dr. Tom Cook", 
    specialty: "Neurologist", 
    experience: "20 Years", 
    description: "Expert in brain disorders and nervous system treatments.", 
    image: "/images/doc6.png" 
  },
  { 
    name: "Dr. Alex Johnson", 
    specialty: "Cardiologist", 
    experience: "15 Years", 
    description: "Heart disease specialist with advanced treatment methods.", 
    image: "/images/doc7.png" 
  },
  { 
    name: "Dr. Sarah White", 
    specialty: "Dermatologist", 
    experience: "10 Years", 
    description: "Skincare expert, specializing in acne and laser treatments.", 
    image: "/images/doc8.png" 
  },
  { 
    name: "Dr. Mark Lee", 
    specialty: "General Physician", 
    experience: "18 Years", 
    description: "Provides comprehensive medical care for all age groups.", 
    image: "/images/doc9.png" 
  },
  { 
    name: "Dr. Emily Davis", 
    specialty: "Pediatrician", 
    experience: "14 Years", 
    description: "Dedicated to children's health and wellness.", 
    image: "/images/doc10.png" 
  },
  { 
    name: "Dr. David Brown", 
    specialty: "Gastroenterologist", 
    experience: "16 Years", 
    description: "Expert in digestive system and liver diseases.", 
    image: "/images/doc11.png" 
  },
  { 
    name: "Dr. Olivia Wilson", 
    specialty: "Otolaryngologist", 
    experience: "13 Years", 
    description: "Specialist in ear, nose, and throat (ENT) disorders.", 
    image: "/images/doc12.png" 
  },
  { 
    name: "Dr. Michael Scott", 
    specialty: "Orthopedic", 
    experience: "17 Years", 
    description: "Treating bone and joint problems with advanced techniques.", 
    image: "/images/doc13.png" 
  },
  { 
    name: "Dr. Anna Roberts", 
    specialty: "Pulmonologist", 
    experience: "19 Years", 
    description: "Expert in lung diseases and respiratory disorders.", 
    image: "/images/doc14.png" 
  },
];

function DoctorList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category');

  const filteredDoctors = category
    ? doctors.filter(doctor => doctor.specialty === category)
    : doctors;

  const handleBookNow = (doctor) => {
    router.push(`/main-site/doctor-detail?name=${encodeURIComponent(doctor.name)}&specialty=${encodeURIComponent(doctor.specialty)}&experience=${encodeURIComponent(doctor.experience)}&description=${encodeURIComponent(doctor.description)}&image=${encodeURIComponent(doctor.image)}`);
  };

  return (
    <div className="py-10 px-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        {category ? category : 'Popular'}<span className="text-blue-500"> Doctors </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border transition-all hover:shadow-xl hover:animate-pulse">
            <div className="w-full h-48 bg-blue-100 rounded-lg overflow-hidden mb-4">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                width={150} 
                height={150} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>
            <p className="text-sm text-blue-500 font-medium">{doctor.specialty}</p>
            <p className="text-sm text-gray-500">{doctor.experience}</p>
            <p className="text-sm text-gray-600 text-center mt-2">{doctor.description}</p>

            <button 
              onClick={() => handleBookNow(doctor)}
              className="mt-3 w-full px-4 py-3 bg-white text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
