import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Greeting = () => {

    const [dateTime , setDateTime] = useState(new Date());

    const userData = useSelector(state => state.user);

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()) , 1000);
        return () => clearInterval(timer);
    } , []);

  return (
    <div className='flex justify-between items-center px-8 mt-4 h-[50px] '>

        <div>
            <h1 className='text-[#f5f5f5] text-2xl font-semibold '>
                Good Morning, {userData.name || "TEST USER"}
            </h1>
            <p className='text-[#ababab] text-sm '>
                Give your best services for customers 😊
            </p>
        </div>

        <div>
            <h1 className='text-[#f5f5f5] text-3xl font-bold tracking-wide w-[130px]'>
                {dateTime.toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </h1>
            <p className='text-[#ababab] text-sm '>
                {dateTime.toLocaleDateString([], { day: "2-digit", month: "long", year: "numeric" })}
            </p>
        </div>

    </div>
  )
}

export default Greeting
