import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

function Logo() {
  return (
    <div className='flex items-center bg-cover h-[30px] text-2xl pt-1'>
      <FontAwesomeIcon icon={faBlog} className='mr-2' />
      <span className='font-normal'>logs</span>
    </div>
  );
}

export default Logo;
