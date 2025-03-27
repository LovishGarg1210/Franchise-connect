import React, { useState,useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import axios from 'axios';
import { Menu } from 'lucide-react';



const Header = ({setIsOpen,isOpen}) => {
  const [Data,setData]=useState(null)
  console.log(Data)
  const email = JSON.parse(localStorage.getItem('useremail'))
  useEffect(()=>{
    const dofetchdata=async()=>{
      try{
        const response=await axios.get('http://localhost:3000/applicant/dofetch');
         const {data} = response.data;
         setData(data.find((user)=> (user.iDEmail === email.toString())))
      }catch(error){
        console.error(error);
      }
    }
    dofetchdata()
  },[email])



  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-800 rounded">
                  <Menu size={20} />
                </button>
        <h1 className="  text-lg md:text-2xl font-semibold text-gray-800">Welcome, Manager</h1>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium capitalize">{Data?.firstName}</p>
              <p className="text-xs text-gray-500">City Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;