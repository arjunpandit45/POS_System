import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import TableCard from '../components/tables/TableCard'
import { tables } from '../constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getTables } from '../https'
import { enqueueSnackbar } from 'notistack'
import { isAxiosError } from 'axios'

const Tables = () => {

    const [status , setStatus] = useState("all");

    // // For Admin pannel get the table data -->
    const { data: resData , isError} = useQuery({
        queryKey : ["tables"],
        queryFn: async () => {
            return await getTables();
        },
        placeholderData : keepPreviousData
    });

    if (isError) {
        enqueueSnackbar("Something went wrong!" , { variant : "error"});
    }

    console.log(resData);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden '>

        <div className='flex items-center justify-between px-10 py-4 mt-2 '>

            <div className='flex items-center gap-4 '>
                <BackButton/>
                <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider '>
                    Tables 
                </h1>
            </div>

            <div className='flex items-center justify-around gap-4 '>

                <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
                 font-semibold ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"} `}
                 onClick={() => setStatus("all")}>
                    All
                </button>

                <button className={`text-[#ababab] text-lg rounded-lg px-5 py-2
                 font-semibold ${status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"} `}
                 onClick={() => setStatus("booked")}>
                    Booked
                </button>
            
            </div>

        </div>

        <div className='flex flex-wrap gap-6 px-16 items-center justify-center
          py-4 overflow-y-scroll scrollbar-hide h-[calc(100vh-5rem)] pb-[165px] '>
            {
                // tables.map((table) => {
                resData?.data.data.map((table) => {
                    return (
                        // <TableCard key={table.id} name={table.name} id={table.id} 
                        //  status={table.status} initials={table.initial} 
                        // seats={table.seats} />
                        <TableCard name={table.tableNo} 
                         id={table._id} 
                         status={table.status} 
                        //  initials={"AP"}
                        initials={table?.currentOrder?.customerDetails?.name}
                         seats={table.seats} />
                    )
                })
            }
        </div>

        <BottomNav/>

    </section>
  )
}

export default Tables
