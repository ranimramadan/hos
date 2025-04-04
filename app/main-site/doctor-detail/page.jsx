"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import DoctorDetail from '../details/components/DoctorDetail';
import DoctorSuggestionList from '../details/components/DoctorSuggestionList';
import Image from 'next/image';

function DoctorDetailPage() {
  const searchParams = useSearchParams();
  const doctorInfo = {
    name: searchParams.get('name') || '',
    specialty: searchParams.get('specialty') || '',
    experience: searchParams.get('experience') || '',
    description: searchParams.get('description') || '',
    image: searchParams.get('image') || '/images/default-doctor.png'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-3 gap-6">
        <DoctorDetail doctorInfo={doctorInfo} />
        <div className="col-span-1">
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
}

export default DoctorDetailPage;