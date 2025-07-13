import React from "react";

const MiniLoader = () => {
  return (
    <div className='flex justify-center items-center h-fit'>
      <div className='w-5 h-5 border-2 border-purple-700 border-t-transparent rounded-full animate-spin'></div>
    </div>
  );
};

export default MiniLoader;
