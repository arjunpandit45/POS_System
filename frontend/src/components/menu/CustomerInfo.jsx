import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAvatarName } from '../../utils'

const CustomerInfo = () => {

  const [dateTime , setDateTime] = useState(new Date());
  
  useEffect(() => {
      const timer = setInterval(() => setDateTime(new Date()) , 1000);
      return () => clearInterval(timer);
  } , []);

  const customerData = useSelector(state => state.customer)

  return (
    <div className='flex items-center justify-between px-4 py-1 '>
        <div className='flex flex-col items-start '>
            <h1 className='text-md text-[#f5f5f5] font-semibold tracking-wide '>
                {customerData.customerName || "Customer Name"}
            </h1>
            <p className='text-xs text-[#ababab] font-medium mt-1 '>
              #{customerData.orderId || "N/A"} / Dine in
            </p>
            <p className='text-xs text-[#ababab] font-medium mt-1 '>
              {dateTime.toLocaleDateString([], { day: "2-digit", month: "long", year: "numeric" })}
              {/* {dateTime.toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })} */}
            </p>
        </div>
        <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg '>
          {getAvatarName(customerData.customerName) || "CN"}
        </button>
    </div>
  )
}

export default CustomerInfo
