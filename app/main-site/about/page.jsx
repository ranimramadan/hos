import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Clock, UserPlus, Stethoscope } from 'lucide-react';

function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">
            About <span className="text-blue-500">Us</span>
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our healthcare platform, where we connect patients with the best healthcare professionals. Our mission is to make healthcare accessible and convenient for everyone through innovative digital solutions.
          </p>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600">Our Mission</h3>
              <p className="text-gray-600">To provide accessible and quality healthcare services to everyone.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600">Our Vision</h3>
              <p className="text-gray-600">To revolutionize healthcare delivery through digital innovation.</p>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] rounded-xl overflow-hidden mx-auto w-[400px]">
          <Image
            src="/images/about_image.png"
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-blue-500">Us</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
            <p className="text-gray-600">Access healthcare services anytime, anywhere. Our platform is available 24/7 for your convenience.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Appointments</h3>
            <p className="text-gray-600">Book appointments with just a few clicks. Simple, fast, and efficient scheduling system.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Stethoscope className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Doctors</h3>
            <p className="text-gray-600">Access to a network of qualified and experienced healthcare professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;