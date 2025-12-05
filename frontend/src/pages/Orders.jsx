import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import { IoArrowBackOutline } from "react-icons/io5";
import BackButton from '../components/shared/BackButton';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { getOrders } from '../https';
 
const Orders = () => {

  const [status , setStatus] = useState("all");

  // Get the order data ->
  const { data : resData , isError } = useQuery({
     queryKey : ["orders"],
     queryFn : async () => {
      return await getOrders();
     },
     placeholderData : keepPreviousData
  })

  if ( isError){
    enqueueSnackbar("Something went wrong!" , {variant : "error"});
  }

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden '>

      <div className='flex items-center justify-between px-10 py-4 mt-2 '>
        <div className='flex items-center gap-4 '>
          <BackButton/>
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider '>
            Orders
          </h1>
        </div>

        <div className='flex items-center justify-around gap-4 '>
          <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
           font-semibold ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"} `}
           onClick={() => setStatus("all")}>
            All
          </button>
          <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
           font-semibold ${status === "progress" && "bg-[#383838] rounded-lg px-5 py-2"} `}
           onClick={() => setStatus("progress")}>
            In Progress
          </button>
          <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
           font-semibold ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"} `}
           onClick={() => setStatus("ready")}>
            Ready
          </button>
          <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
           font-semibold ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"} `}
           onClick={() => setStatus("completed")}>
            Completed
          </button>
        </div>
      </div>

      <div className='flex flex-wrap gap-6 px-16 items-center justify-center
       py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem)] pb-[165px] '>
        {
          resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderCard key={order._id} order={order} />
            })
          ) : <p className='col-span-3 text-gray-500 '>No Orders available</p>
        }
      </div>

      <BottomNav/>

    </section>
  )
}

export default Orders
