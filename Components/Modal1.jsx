import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

const modal1 = ({isVisible, onClose, children}) => {

  if(!isVisible) return null;

  return (
    
    <div className="fixed inset-0 bg-[#272829] bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className='w-[600px] flex flex-col'>
          <button className='text-xl text-[#61677A]  place-self-end' onClick={()=> onClose()}><AiFillCloseCircle/></button>
          <div className='bg-[#D8D9DA] p-5 rounded'>
            {children} 
          </div>
      </div>
    </div>
  
  )
}

export default modal1