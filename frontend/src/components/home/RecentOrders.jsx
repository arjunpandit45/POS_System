import React from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrders, updateOrderStatus } from '../../https'
import { enqueueSnackbar } from 'notistack'

const RecentOrders = () => {

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
    <div className='px-8 mt-2'>

        <div className='bg-[#1a1a1a] w-full h-[305px] rounded-lg'>

            <div className='flex justify-between items-center px-6 py-2 '>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>
                    Recent Orderes
                </h1>
                <a href="" className='text-[#025cca] text-sm font-semibold '>
                    View all
                </a>
            </div>

            {/* SEARCH --> */}
            <div className='flex items-center gap-4 bg-[#1f1f1f] 
                rounded-[10px] px-6 py-2.5 mx-6  '>

                <FaSearch className='text-[#f5f5f5]' />
                <input type="text" placeholder='Search recent orderes' 
                className='bg-[#1f1f1f] outline-none text-[#f5f5f5] '/>

            </div>

            {/* Order List --> */}
            <div className='mt-4 px-6 overflow-y-scroll h-[300px] 
              scrollbar-hide pb-[110px] '>
                {/* <OrderList/> */}
                {
                    resData?.data.data.length > 0 ? (
                        resData.data.data.map((order) => {
                        return <OrderList key={order._id} order={order} />
                        })
                    ) : <p className='col-span-3 text-gray-500 '>No Orders available</p>
                }
            </div>

        </div>
       
    </div>
  )
}

export default RecentOrders
