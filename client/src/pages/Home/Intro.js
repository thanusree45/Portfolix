import React from 'react';
import { useSelector } from 'react-redux';

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root); 
  const {intro} = portfolioData;
  const {firstName, lastName,welcomeText, description, caption} = intro;
  return (
    <div className='h-[80vh] bg-primary flex-col items-start justify-center gap-8 py-6 m-50 sm:mb-40'>
     <h1 className='text-white text-3xl sm:text-1xl'>{welcomeText || ''}</h1>
     <div> <h1 className='text-6xl sm:text-3xl text-secondary font-semibold'>{firstName || ''}</h1>
      <h1 className='text-6xl sm:text-2xl text-secondary font-semibold'>{lastName || ''}</h1>
      </div>
      <p className='text-2xl sm:text-1xl text-teritiary font-semibold'>{caption || ''}</p>
      <p className='text-white sm:text-xl w-2/3'>
       {description || ''}
      </p>
      <button className='border-2 border-teritiary text-teritiary px-10 py-3 rounded'>
        Get Started
      </button>
    </div>
  );
}

export default Intro; 
