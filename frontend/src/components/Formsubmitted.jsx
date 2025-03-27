import React from 'react'
import { CheckCheck } from 'lucide-react';

const Formsubmitted = () => {
  return (
    <>
    <div >
        
      <CheckCheck  size={150} className='mx-auto   text-green-500 ' />
      <h1 className='w-80  text-center mx-auto  text-2xl '>submitted sucessfully </h1>
      < p className='w-full mt-5 text-center mx-auto  text-2xl '> You will be notify soon within the 72 hours ....</p>
    </div>
    </>
  )
}

export default Formsubmitted
