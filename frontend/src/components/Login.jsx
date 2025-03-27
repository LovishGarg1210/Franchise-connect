import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RegistartionForm = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const dologin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://franchise-connect-1.onrender.com//franchise/dologin', data);
       alert(response.data.message)
     
     
       console.log("aja",response.data.user)
       if(response.data.user.iDEmail)
         localStorage.setItem("useremail",JSON.stringify(response.data.user.iDEmail))
     
        

      
      Navigate("/userdashboard")

    } catch (error) {
      console.log("Error: " + error.response.data.message || error.message);
      alert("Error: " + error.response.data.message || error.message)
    }
  }
  const dochange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-[70vh]  flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-red-600">
                Go login
              </h1>
              <p className="text-[12px] mt-5 text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={dochange}
                  placeholder="Enter your email"
                />

                <input
                  className="w-full px-5 py-3 mt-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={dochange}
                  placeholder="Password"
                />
                <button className="mt-5 tracking-wide font-semibold bg-red-700 text-gray-100 w-full py-4 rounded-lg hover:bg-red-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"  onClick={(e) => dologin(e)}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-red-600 text-center">
                  Already have an account?{" "}
                  <a href="">
                    <span className="text-black font-semibold">Sign in</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistartionForm;


