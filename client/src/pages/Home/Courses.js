import React from 'react'
import SectionTitle from '../../components/SectionTitle'
// import { courses } from '../../resources/courses';
import { useSelector } from 'react-redux';

function Courses() {
    const [selectedItemIndex, setselectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root); 
  const { courses } = portfolioData; 
    return (
    <div>
        <SectionTitle title="Courses" />
        <div className='flex py-10 gap-20 sm:flex-col'>
        <div className='flex flex-col gap-10 border-l-2 border-[#fde68a] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
        {courses.map((course, index) => (
          <div key={index} onClick={() => {
            setselectedItemIndex(index);
          }}
          className='cursor-pointer'
        >
            <h1 className={`text-xl px-5
                ${selectedItemIndex === index
                 ? 'text-teritiary border-teritiary border-l-4 -ml-[3px] bg-[#dac77c5f] py-3 sm:w-40'
                 : 'text-white py-3'} `}>{course.title}</h1>
          </div>
        ))}
      </div>
      
      <div className='flex items-center justify-center gap-10 sm:flex-col'>
      <div className='flex flex-col gap-5'>
        <a className='text-blue-300 underline' href={courses[selectedItemIndex].link}>{courses[selectedItemIndex].link}</a>
      </div>
      <img src={courses[selectedItemIndex].image} alt="course img" className='h-60 w-80'/>
      </div>
      </div>
    </div>
  )
}

export default Courses