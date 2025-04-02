'use client';
import Image from 'next/image';

const BookingBanner = () => {
  return (
    <div className="relative mt-20">
      <div className="bg-blue-600 text-white p-4 rounded-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1 text-left pl-15">
            <h1 className="text-5xl font-bold leading-tight">
              Book Appointment <br /> With 100+ Trusted Doctors
            </h1>
            <div className="mt-6">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                Create account →
              </button>
            </div>
          </div>
          <div className="relative translate-y-5 right-30">
            <Image 
              src="/images/appointment_img.png" 
              alt="Doctor" 
              width={450} 
              height={450} 
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingBanner;