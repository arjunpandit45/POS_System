import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from './Modal';
import { useDispatch } from "react-redux";
import { setCustomer } from '../../redux/slices/customerSlice';

const BottomNav = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Order Modal 
  const [isModalOpen , setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [guestCount , setGuestCount] = useState(0);

  // For Will like work -->
  const dispatch = useDispatch()
  const [name , setName] = useState();
  const [ phone , setPhone] = useState();

  const increment = () => {
    if(guestCount >= 6) return ;
    setGuestCount((prev) => prev+1);
  }
  const decrement = () => {
    if(guestCount <= 0) return;
    setGuestCount((prev) => prev-1);
  }

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    // send the data to store 
    dispatch(setCustomer({name , phone , guests: guestCount}));
    navigate("/tables");
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626]
     p-2 h-16 flex justify-around '>

      <button  className={`flex items-center justify-center font-bold 
       ${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
       onClick={() => navigate("/")}>
        <FaHome className='inline mr-2 ' size={20}/>
        <p>Home</p> 
      </button>

      <button className={`flex items-center justify-center font-bold 
       ${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
       onClick={() => navigate("/orders")}>
        <MdOutlineReorder className='inline mr-2 ' size={20}/>
        <p>Orders</p>
      </button>

      <button className={`flex items-center justify-center font-bold 
       ${isActive("/tables") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px]`}
       onClick={() => navigate("/tables")}>
        <MdTableBar className='inline mr-2 ' size={20}/>
        <p>Tables</p>
      </button>

      <button className='flex items-center justify-center text-[#ababab] 
        w-[200px] '>
        <CiCircleMore className='inline mr-2 ' size={20}/>
        <p>More</p>
      </button>

      <button className='absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] 
       rounded-full p-3 items-center '
       onClick={openModal} 
       disabled={isActive("/tables") || isActive("/menu") } >
        <BiSolidDish size={30} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">

        <div>
          <label className='block text-[#ababab] mb-2 text-sm font-medium '>Costumer Name</label>
          <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1ff1f] '>
            <input type="text" name="" placeholder='Enter customer name' 
             className='bg-transparent flex-1 text-white focus:outline-none '
             value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>

        <div>
          <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium '>Costumer Phone</label>
          <div className='flex items-center rounded-lg p-3 px-4 bg-[#1f1ff1f] '>
            <input type="number" name="" placeholder='+91-99999999999' 
             className='bg-transparent flex-1 text-white focus:outline-none '
             value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
        </div>

        <div>
          <label className='block mb-2 mt-3 text-sm font-medium text-[#ababab] '>Guest</label>
          <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg '>
            <button onClick={decrement} className='text-yellow-500 text-2xl '>&minus;</button>
            <span className='text-white '>{guestCount} Person</span>
            <button onClick={increment} className='text-yellow-500 text-2xl '>&#43;</button>
          </div>
        </div>

        <button className='w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 
         mt-8 hover:bg-yellow-700 '
          onClick={handleCreateOrder}>
          {/* onClick={() => navigate("/tables")}> */}
          Create Order 
        </button>
      </Modal>

    </div>
  )
}

export default BottomNav
