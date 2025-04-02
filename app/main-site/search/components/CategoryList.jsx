"use client";

import React, { useState } from "react";
import { Search, Baby, Brain, HeartPulse, User, ShieldPlus, Activity, Microscope } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "General Physician", icon: <User size={40} className="text-blue-500" /> },
  { name: "Otolaryngologist", icon: <ShieldPlus size={40} className="text-blue-500" /> },
  { name: "Dermatologist", icon: <User size={40} className="text-blue-500" /> },
  { name: "Pediatrician", icon: <Baby size={40} className="text-blue-500" /> },
  { name: "Neurologist", icon: <Brain size={40} className="text-blue-500" /> },
  { name: "Gastroenterologist", icon: <HeartPulse size={40} className="text-blue-500" /> },
  { name: "Cardiologist", icon: <Activity size={40} className="text-blue-500" /> },
  { name: "Pulmonologist", icon: <Microscope size={40} className="text-blue-500" /> },
  { name: "Orthopedic", icon: <User size={40} className="text-blue-500" /> }
];

function CategoryList() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryClick = (categoryName) => {
    router.push(`/main-site/search?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-4">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search for categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 outline-none"
        />
      </div>
      <ul>
        {filteredCategories.map((category, index) => (
          <li 
            key={index} 
            className="flex items-center p-3 border-b last:border-none hover:bg-blue-50 rounded-lg cursor-pointer transition-colors duration-200"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.icon}
            <span className="ml-3 text-gray-700 font-medium">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
