'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import {AiOutlineHome, AiOutlineUser} from "react-icons/ai"
import {signOut} from "next-auth"
const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleModal = () => setShowModal(prev => !prev)

useEffect(() => {
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }
}, [])

  return (
    <div className={`fixed z-50 top-0 left-0 h-16 w-full ${isScrolled ? "shadow-md backdrop-blur" : ""}`}>

      <div className="h-full w-2/3 mx-auto flex items-center justify-between">
<Link href="/" className="flex items-center gap-2 transition-all">
 <h1 className={`${isScrolled ? "text-blue-600" : "text-[#cec7c7]"} text-2xl font-bold`}>
  TravelHub
 </h1>
 <AiOutlineHome size={25} 
 color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}/>
</Link>

<div>
    <div className="cursor-pointer" onClick={toggleModal}>
      <AiOutlineUser size={30}  
      color={`${isScrolled ? "rgb(37 99 235)" : "#cec7c7"}`}/>
    </div>
    {showModal && (
     <div
     onClick={toggleModal}
     className="absolute top-16 right-[270px] shadow-md flex flex-col items-center gap-4 p-4 bg-white rounded-xl"
 >
  <Link href="/reservations">
        Reservations
        </Link>
        <button onClick={() => signOut()} className="text-slate-500 text-center">
      Logout
        </button>


      </div>
    )}


</div>

      </div>
      
    </div>
  )
}

export default Navbar
