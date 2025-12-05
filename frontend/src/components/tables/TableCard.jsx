import React from 'react'
import { getAvatarName, getRandomBG } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateTable } from '../../redux/slices/customerSlice'
import { FaLongArrowAltRight } from 'react-icons/fa'

// const TableCard = ({key, name, status, initials , seats}) => {
const TableCard = ({id, name, status, initials , seats}) => {

  // for billing section -->
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleClick = (name) => {
    if ( status === "Booked") return;

    // last add -->
    const table = { tableId : id , tableNo : name}

    // dispatch(updateTable({tableNo : name}))
    dispatch(updateTable({table}))
    navigate('/menu');
  }

  return (

    // <div onClick={() => handleClick(name)} key={key} className='w-[300px] bg-[#262626] hover:bg-[#1f1f1f] p-4 rounded-lg mb-3 cursor-pointer '>
    <div onClick={() => handleClick(name)} key={id} className='w-[300px] bg-[#262626] hover:bg-[#1f1f1f] p-4 rounded-lg mb-3 cursor-pointer '>
      
      <div className='flex items-center justify-between px-1 '>
        <h1 className='text-[#f5f5f5] text-xl font-semibold '>
            {/* Table <FaLongArrowAltRight className='text-[#ababab] '/>  {name} */}
            Table : {name}
        </h1>
        <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]"
            : "text-white bg-[#664a04] "} px-2 py-1 rounded-lg`}>
            {status} 
        </p>
      </div>

      <div className='flex items-center justify-center my-5 '>
        <h1 className='text-white rounded-full p-5 text-xl'
         style={{ backgroundColor: initials ? getRandomBG() : "#1f1f1f" }}>
            {/* {initials} */}
            {getAvatarName(initials) || "N/A"}
        </h1>
      </div>

      <p className='text-[#ababab] text-sm'>
        Seats: <span className='text-[#f5f5f5]'>{seats}</span> 
      </p>

    </div>
  )
}

export default TableCard
