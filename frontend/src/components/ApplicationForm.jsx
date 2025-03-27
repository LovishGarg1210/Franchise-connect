import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    Resident:'',
    address: '',
    city: '',
    state: '',
   
    Area: '',
   
    experience: '',
  });

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/applicant/dosend', formData);
      

      // Handle success
      console.log('API response:', response.data.data);
      
      navigate('/submitted'); 
      
    } catch (error) {
     console.log(error.response.data.message)
      alert(error.response.data.message)
      // alert(error)
      
    }

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 transform hover:scale-[1.01] transition-transform duration-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 ">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block  text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block shadow-red-200 w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm  font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block shadow-red-200 w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Resident</label>
            <input
              type="text"
              name="Resident"
              value={formData.Resident}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />   
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-6">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <input
            type='text'
              name="Area"
              value={formData.Area}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder='area( in sq.ft.)'
              required
            />
             
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Business Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full shadow-red-200 h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="flex  justify-center md:justify-end mt-6">
          <button
            type="submit"

            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Submit Application
          </button>
        </div>
      </div>
    </form>
  );
}