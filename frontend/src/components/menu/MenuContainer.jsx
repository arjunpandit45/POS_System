import React, { useState } from 'react'
import { menus } from '../../constants'
import { GrRadialSelected } from 'react-icons/gr'
import { getRandomBG } from '../../utils'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addItems } from '../../redux/slices/cartSlice'

const MenuContainer = () => {

    const [selected , setSelected] = useState(menus[0]);
    const dispatch = useDispatch();

    // Add Item -->
    const [itemCount , setItemCount] = useState(0);
    const [itemId , setItemId] = useState();
    
    const increment = (id) => {
        setItemId(id);
        if(itemCount >= 4) return ;
        setItemCount((prev) => prev+1);
    }
    const decrement = (id) => {
        setItemId(id);
        if(itemCount <= 0) return;
        setItemCount((prev) => prev-1);
    }

    const handleAddToCart = (item) => {
        if (itemCount === 0) return ;

        const {name , price} = item;
        const newObj = { id: new Date() , name, pricePerQuantity : price , 
            quantity : itemCount , price : price * itemCount 
        };

        dispatch(addItems(newObj));
        setItemCount(0);
       
    }

  return (
    <>
    <div className='grid grid-cols-4 gap-4 px-4 w-full '>
       {
        menus.map((menu) => {
            return (
                <div key={menu.id} className='flex flex-col items-start justify-between 
                 p-4 rounded-lg h-[100px] cursor-pointer ' 
                //  style={{backgroundColor : getRandomBG()}}>
                 style={{backgroundColor : menu.bgColor}}
                 onClick={() => {
                        setSelected(menu);
                        setItemId(0);
                        setItemCount(0);
                    }}
                 >

                    <div className='flex items-center justify-between w-full'>
                        {/* <h1 className='text-[#f5f5f5] text-lg font-semibold '> */}
                        <h1 className='text-lg font-semibold '>
                            {menu.icon} {menu.name}
                        </h1>
                        {selected.id === menu.id && <GrRadialSelected className='text-white' size={20} /> }
                    </div>

                    {/* <p className='text-[#ababab] text-sm font-semibold '> */}
                    <p className='text-sm font-semibold '>
                        {menu.items.length} Items 
                    </p>
                </div>
            )
        })
       }
    </div>

    {/* Below Section --> */}
    <hr className='border-[#2a2a2a] border-t-2 mt-4 ' />

    <div className='grid grid-cols-4 gap-4 px-4 w-full mt-3 '>
       {
        selected?.items.map((item) => {
            return (
                <div key={item.id} className='flex flex-col items-start justify-between 
                 p-4 rounded-lg h-[100px] cursor-pointer bg-[#1a1a1a] hover:bg-[#2a2a2a] '>

                    <div className='flex items-start justify-between w-full '>
                        <h1 className='text-[#f5f5f5] text-lg font-semibold '>
                            {item.name}
                        </h1>
                        <button className='bg-[#2e4a40] text-[#02ca3a] p-1 mb-1 rounded-lg cursor-pointer '
                         onClick={() => handleAddToCart(item)}>
                            <FaShoppingCart size={20}/>
                        </button>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <p className='text-white text-xl font-semibold '>
                            ₹{item.price} Items 
                        </p>
                        <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-1 rounded-lg gap-x-1.5'>
                            <button onClick={() => decrement(item.id)} className='text-yellow-500 text-2xl cursor-pointer '>&minus;</button>
                            <span className='text-white '>{item.id === itemId ? itemCount : "0" }</span>
                            <button onClick={() => increment(item.id)} className='text-yellow-500 text-2xl cursor-pointer '>&#43;</button>
                        </div>
                    </div>

                </div>
            )
        })
       }
    </div>

    </>
  )
}

export default MenuContainer
