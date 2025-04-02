'use client';
import React from 'react';
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Eye, 
  Bone, 
  Syringe 
} from 'lucide-react';

const services = [
  {
    icon: <Stethoscope className="w-12 h-12 text-blue-500" />,
    title: "General Health Care",
    description: "Comprehensive health services for your overall well-being and preventive care."
  },
  {
    icon: <Brain className="w-12 h-12 text-blue-500" />,
    title: "Neurology",
    description: "Expert care for neurological conditions with advanced diagnostic and treatment options."
  },
  {
    icon: <Heart className="w-12 h-12 text-blue-500" />,
    title: "Cardiology",
    description: "Specialized heart care services with state-of-the-art cardiac treatments."
  },
  {
    icon: <Eye className="w-12 h-12 text-blue-500" />,
    title: "Ophthalmology",
    description: "Complete eye care services from routine check-ups to advanced treatments."
  },
  {
    icon: <Bone className="w-12 h-12 text-blue-500" />,
    title: "Orthopedics",
    description: "Expert care for bone and joint conditions with modern treatment approaches."
  },
  {
    icon: <Syringe className="w-12 h-12 text-blue-500" />,
    title: "Emergency Care",
    description: "24/7 emergency medical services with rapid response and expert care."
  }
];

function Services() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 transform hover:scale-105 transition-transform duration-300">
      <h1 className="text-4xl font-bold mb-4">
          Our <span className="text-blue-500">Services</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We provide a wide range of medical services with state-of-the-art facilities 
          and experienced healthcare professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              {service.description}
            </p>
            <div className="mt-6 text-center">
              <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300 flex items-center justify-center mx-auto gap-2">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transform -skew-y-2"></div>
        <div className="relative bg-white p-12 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Need Special Care?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Contact us to schedule a consultation with our specialists
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-4 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
              Book Appointment Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;