"use client";

import React, { useState } from 'react';
import { Search } from "lucide-react";
import {  Baby, Brain, HeartPulse, User,  ShieldPlus,  Activity, Microscope } from "lucide-react";
import Link from 'next/link';

const categories = [
  { name: "General physician", icon: <User size={40} className="text-blue-500" /> },
  { name: "Gynecologist", icon: <ShieldPlus size={40} className="text-blue-500" /> },
  { name: "Dermatologist", icon: <User size={40} className="text-blue-500" /> },
  { name: "Pediatricians", icon: <Baby size={40} className="text-blue-500" /> },
  { name: "Neurologist", icon: <Brain size={40} className="text-blue-500" /> },
  { name: "Gastroenterologist", icon: <HeartPulse size={40} className="text-blue-500" /> },

  { name: "Cardiologist", icon: <Activity size={40} className="text-blue-500" /> },
  { name: "Pathologist", icon: <Microscope size={40} className="text-blue-500" /> }
];

function Category_Search() {
  const [search, setSearch] = useState("");

  return (
    <div className='mb-10 items-center flex flex-col gap-4 mt-8'>
      <h2 className='font-bold text-4xl tracking-wide'>
        Search <span className='text-blue-500'>Doctors</span>
      </h2>
      <h2 className='text-gray-500 text-xl text-center'>
        Search Your Doctor And Book Appointment In One Click
      </h2>
      
      <div className='flex items-center gap-2 w-full max-w-md'>
        <input 
          type='text' 
          placeholder='Search for a doctor...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500' 
        />
        <button className='bg-blue-500 text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600'>
          <Search size={18} /> Search
        </button>
      </div>
      
      <div className='flex flex-wrap gap-6 mt-6 justify-center'>
        {categories.map((category, index) => (
          <Link 
            href={`/main-site/search?category=${encodeURIComponent(category.name)}`}
            key={index}
          >
            <button 
              className='flex flex-col items-center gap-2 cursor-pointer transition-transform transform hover:scale-105 hover:animate-pulse'
            >
              <div className='w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full shadow-md'>
                {category.icon}
              </div>
              <span className='text-sm font-semibold text-gray-700 text-center'>{category.name}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category_Search;
