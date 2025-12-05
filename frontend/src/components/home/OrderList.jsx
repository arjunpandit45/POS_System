import React from 'react'
import { FaCheckDouble } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from '../../utils';

const OrderList = ({ key , order}) => {

  return (
    <div className='flex items-center gap-5 mb-2.5 '>

        <button className='bg-[#f6b100] p-3 text-sm font-bold rounded-lg '>
            {/* AM */}
            {getAvatarName(order.customerDetails.name)}
        </button>

        <div className='flex items-center justify-between w-full '>

            <div className='flex flex-col items-start gap-1 '>
                <h1 className='text-[#f5f5f5] text-sm font-semibold tracking-wide '>
                    {/* Arjun Pandit */}
                    {order.customerDetails.name}
                </h1>
                <p className='text-[#ababab] text-sm '>
                    {/* 8 Items  */}
                    {order.items.length} Items 
                </p>
            </div>

            <div>
                <h1 className='text-[#f6b100] font-semibold border 
                 border-[#f6b100] rounded-lg p-1 text-sm '>
                    {/* Teble No : 3  */}
                    Table : {order.table?.tableNo}
                </h1>
            </div>

            <div className='flex flex-col items-end gap-1 '>

                {/* <p className='text-green-600 text-sm '>
                    <FaCheckDouble className='inline mr-2 text-sm ' />
                    Ready 
                </p>
                <p className=' text-[#ababab] text-sm '>
                    <FaCircle className='inline mr-2 text-green-600 text-sm ' />
                    <span className='text-sm'>Ready to serve</span>
                </p> */}
                {
                    order.orderStatus === "Ready" ? (
                        <>
                        <p className='text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg '>
                            <FaCheckDouble className='inline mr-2 text-sm ' />
                            {order.orderStatus} 
                        </p>
                        
                        </>
                    ) : (
                        <>
                        <p className='text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg '>
                            <FaCircle className='inline mr-2 text-sm ' />
                            {order.orderStatus} 
                        </p>
                        </>
                    )
                }

            </div>

        </div>
    </div>
  )
}

export default OrderList
