import React from 'react';

function LeftSider() {
  return (
    <div className='fixed left-0 bottom-0 px-10 sm:static'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col gap-3 sm:flex-row'>
          <a href="mailto:thanur454Agmail.com" target="_blank" rel="noopener noreferrer">
            <i className="ri-mail-line text-gray-400 text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/thanusreeramapatruni" target="_blank" rel="noopener noreferrer">
            <i className="ri-linkedin-box-line text-gray-400 text-xl"></i>
          </a>
          <a href="https://github.com/thanusree454" target="_blank" rel="noopener noreferrer">
            <i className="ri-github-line text-gray-400 text-xl"></i>
          </a>
        </div>
        <div className="w-[1px] h-52 bg-[#b2c3cb] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
