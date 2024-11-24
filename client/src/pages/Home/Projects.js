import React from 'react'
import SectionTitle from '../../components/SectionTitle'
//import { projects } from '../../resources/projects';
import { useSelector } from 'react-redux';

function Projects() {
    const [selectedItemIndex, setselectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root); 
  const { projects } = portfolioData;
    return (
    <div>
        <SectionTitle title="Projects" />
        <div className='flex py-10 gap-20 sm:flex-col sm:mb-30'>
        <div className='flex flex-col gap-10 border-l-2 border-[#fde68a] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
        {projects.map((project, index) => (
          <div key={index} onClick={() => {
            setselectedItemIndex(index);
          }}
          className='cursor-pointer'
        >
            <h1 className={`text-xl px-5
                ${selectedItemIndex === index
                 ? 'text-teritiary border-teritiary border-l-4 -ml-[3px] bg-[#dac77c5f] py-3 sm:w-40'
                 : 'text-white py-3'} `}>{project.title}</h1>
          </div>
        ))}
      </div>
      
      <div className='flex items-center justify-center gap-10 sm:flex-col'>
        <img src={projects[selectedItemIndex].image} alt="project-img" className='h-60 w-72'/>
      <div className='flex flex-col gap-5'>
        <h1 className='text-secondary text-2xl'>{projects[selectedItemIndex].title}</h1>
        <p className='text-white text-1xl'>{projects[selectedItemIndex].description}</p>
        <p className='text-white'>
        {projects[selectedItemIndex].technologies}
        </p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Projects
