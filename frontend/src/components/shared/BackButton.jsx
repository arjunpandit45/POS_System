import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <button className='bg-[#025cca] p-2 text-xl 
     font-bold rounded-full text-white '
     onClick={() => navigate(-1)}>
        <IoArrowBackOutline />
    </button>
  )
}

export default BackButton
