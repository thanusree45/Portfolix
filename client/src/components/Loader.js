import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
    <div className='flex gap-5 text-6xl sm:text-3xl font-semibold'>
        <h1 className='text-secondary t'>T</h1>
        <h1 className='text-white s'>S</h1>
        <h1 className='text-teritiary r'>R</h1>
    </div>
    </div>
  )
}

export default Loader