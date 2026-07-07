import React, { useState } from 'react'
import restro_image from '../assets/images/restaurant-img.jpg'
import logo from '../assets/images/logo.png' 
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

const Auth = () => {

  const [isRegister , setIsRegister] = useState(false);

  return (
    <div className='flex min-h-screen w-full '>

     {/* Left Section --> */}
      {/* <div className="relative w-1/2 h-screen overflow-hidden">

    <img
        src={restaurant}
        alt="Restaurant"
        className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="absolute inset-0 bg-black/50"></div>

    <blockquote className="absolute bottom-10 left-8 right-8 z-10 text-white italic text-2xl">
        "Serve customers the best food with prompt and friendly service in a welcoming atmosphere, and they'll keep coming back."

        <span className="block mt-4 text-yellow-400">
            — Founder of Restro
        </span>
    </blockquote>

    </div> */}

    <div className="hidden lg:block w-1/2 relative">
                    
      <img
        src={restro_image}
        alt="restro_image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* BLACK OVERLAY (shade only) */}
      <div className="absolute inset-0 bg-black/60"></div>

      <blockquote className="absolute bottom-2 px-8 mb-10 text-white text-xl italic">
        "Serve customers the best food with prompt and friendly service in a 
        welcoming atmosphere, and they'll keep coming back."
        
        <br />
        <span className="block mt-2 text-yellow-400">- Founder of Restro</span>
      </blockquote>
    </div>

      {/* Right Section  */}
      <div className='w-1/2 min-h-screen bg-[#1a1a1a] p-10 '>

        <div className='flex flex-col items-center gap-2 '>
          <img src={logo} alt="Restro Logo" className=' h-14 w-14 border-2 
          rounded-2 rounded-full ' />
          <h1 className='text-lg font-semibold text-[#f5f5f5] tracking-wide '>
            Restro 
          </h1>
        </div>

        <h2 className='text-4xl text-center mt-10 font-semibold text-yellow-400 mb-10'>
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Components  */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login/>}
         

        <div className='flex justify-center mt-6 '>
          <p className='text-sm text-[#ababab]'>
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <a className='text-yellow-400 font-semibold hover:underline'
              href="#" 
              onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>


      </div>
      
    </div>
  )
}

export default Auth
