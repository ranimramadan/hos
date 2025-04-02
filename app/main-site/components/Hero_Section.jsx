import React from 'react';
import Image from 'next/image';

function Hero_Section() {
  return (
    <section className="relative bg-blue-600 text-white mt-8 rounded-b-[50px]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          {/* Left Section - Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold sm:text-5xl leading-tight">
              Book Appointment <br /> With Trusted Doctors
            </h1>

            <p className="mt-4 text-lg text-white/80">
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>

            <div className="mt-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
                Book appointment →
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative flex justify-center">
            <Image
              src="/header_img.png"
              alt="Doctors"
              width={500}
              height={500}
              className="rounded-lg drop-shadow-lg  -bottom-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero_Section;
