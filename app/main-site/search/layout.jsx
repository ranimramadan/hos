import React from 'react'
import CategoryList from './components/CategoryList'

function layout({children}) {
  return (
    <div className='grid grid-cols-4'>
        <div>
                {/* الاصناف */}
                <CategoryList/>
        </div>

        <div className='col-span-3'>
             {children}
        </div>
        
    </div>
  )
}

export default layout