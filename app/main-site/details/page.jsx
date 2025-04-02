import React from 'react';
import { DoctorDetail } from './components/DoctorDetail';
import DoctorSuggestionList from './components/DoctorSuggestionList';



function Details() {
  return (
    <div className='p-5 md:px-20'> 
      <h2 className="text-4xl font-bold text-center mb-8">
        Details <span className="text-blue-500">Doctors</span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {/* تفاصيل الدكتور */}
        <div className='col-span-3'>
          <DoctorDetail/>
        </div>

        {/* اقتراحات */}
        <div className='col-span-1'>
          <DoctorSuggestionList/>
        </div>
      </div>
    </div>
  );
}

export default Details;
