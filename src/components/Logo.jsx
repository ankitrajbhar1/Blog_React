import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

function Logo() {
  return (
    <div className='w-full bg-cover h-[30px] text-2xl pt-1'>
      <FontAwesomeIcon icon={faBlog} /><span className='px-2 w-full font-normal'>logs</span>
      
    </div>
  );
}

export default Logo;
