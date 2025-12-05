import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion"
import { useMutation } from '@tanstack/react-query';
import { FaSlash } from 'react-icons/fa';
import { enqueueSnackbar } from 'notistack';
import { addTable } from '../../https';

const Modal = ({setIsTableModalOpen}) => {

    const [tableData , setTableData] = useState({
        tableNo : "",
        seats : ""
    })

    const handleCloseModal = () => {
        setIsTableModalOpen(false);
    }

    const handleInputChange = (e) => {
        const { name , value } = e.target;
        setTableData((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutation.mutate(tableData);
    }

    const tableMutation = useMutation({
        mutationFn : (reqData) => addTable(reqData),
        onSuccess : (res) => {
            setIsTableModalOpen(false);
            const { data } = res;
            enqueueSnackbar( data.message , { variant : "success"});
            console.log(res);
        },
        onError : (error) => {
            const { data } = error.response;
            enqueueSnackbar( data.message , { variant : "error"});
            console.log(error);
        }
    })

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>

        <motion.div
            initial = {{opacity : 0 , scale : 0.9}}
            animate = {{opacity : 1 , scale : 1}}
            exit = {{opacity : 0 , scale : 0.9}}
            transition = {{duration : 0.3 , ease : "easeInOut"}}
            className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
            >

            {/* Modal Header --> */}

            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#f5f5f5] text-xl font-semibold '>
                    Add Table 
                </h2>
                <button onClick={handleCloseModal} className='text-[#f5f5f5] 
                 hover:text-red-500'>
                    <IoMdClose size={24} />
                </button>
            </div>  

            {/* Modal Body --> */}
            <form onSubmit={handleSubmit} className='space-y-4 mt-10 '>

                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium '>
                        Table Number 
                    </label>
                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] '>
                        <input type="number" 
                            name='tableNo'
                            className='bg-transparent flex-1 text-white focus:outline-none '
                            required 
                            value={tableData.tableNo}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium '>
                        Number of Seats 
                    </label>
                    <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f] '>
                        <input type="number" 
                            name='seats'
                            className='bg-transparent flex-1 text-white focus:outline-none '
                            required 
                             value={tableData.seats}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type='submit' className='w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold rounded-lg '>
                    Add Table 
                </button>
                
            </form>

        </motion.div>
      
    </div>

  )
}

export default Modal
