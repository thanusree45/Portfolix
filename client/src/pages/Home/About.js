import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root); 
  const {about} = portfolioData;
  const {skills, lottieURL, description1, description2} = about;

  return (
    <div>
      <SectionTitle title="About" />
      <div className='flex w-full items-center sm:flex-col sm:mt-30 sm:mb-30'>
        <div className='h-[70vh] w-1/3 sm:w-full'>
          <img 
            src={lottieURL || '/assets/thanusreepic.jpg'} 
            alt="img"
            style={{ width: '50%', height: '50%' }}
          ></img>
        </div>
        <div className='flex flex-col gap-5 w-2/3 sm:w-full'>
          <p className='text-white'>
           {description1 || " "}    
          </p>
          <p className='text-white'>
            {description2 || " "}   
          </p>
        </div>
      </div>
      <div className='py-5'>
        <h1 className='text-white text-xl'>
          Here are a few tech skills I worked on:
        </h1>
        <div className='flex flex-wrap gap-10 mt-5'>
          {skills.map((skill, index) => (
            <div className='border border-teritiary py-3 px-10' key={index}>
              <h1 className='text-teritiary'>{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
