import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sales() {
    const [formData, setFormData] = useState({
        email: "",  // Added email to form data
        date: '',
        totalRevenue: 0,
        totalUnitsSold: 0,
        totalTransactions: 0,
        totalReturns: 0,
        netRevenue: 0,
        discountsGiven: 0,
        cashPayment: 0,
        creditCardPayment: 0,
        bankTransferPayment: 0,
        remarks: '',
    });

    // Fetch email from localStorage
    useEffect(() => {
        const userEmail = JSON.parse(localStorage.getItem('useremail'));
        if (userEmail) {
            setFormData(prevData => ({
                ...prevData,
                email: userEmail, // Ensure email is always available in form data
            }));
        }
    }, []); // Empty dependency ensures it runs only on initial mount

    // Generic handleChange function
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the email is included before submission
        const userEmail = JSON.parse(localStorage.getItem('useremail'));
        if (userEmail) {
            setFormData(prevData => ({
                ...prevData,
                email: userEmail, // Ensure the email is in the formData at the time of submission
            }));
        }

        console.log("Form data before submission:", formData);

        try {
            const response = await axios.post('https://franchise-connect-1.onrender.com/sales/dosale', formData);
            console.log(response);
            alert("Sale Data Submitted Successfully");

            // Reset the form, keeping the email
            setFormData({
                date: '',
                totalRevenue: 0,
                totalUnitsSold: 0,
                totalTransactions: 0,
                totalReturns: 0,
                netRevenue: 0,
                discountsGiven: 0,
                cashPayment: 0,
                creditCardPayment: 0,
                bankTransferPayment: 0,
                remarks: '',
                email: userEmail || '',  // Ensure email persists in the form after reset
            });

        } catch (error) {
            console.error("Error submitting the data", error);
        }
    };

    return (
        <div className="max-w-5xl  mt-0 md:mt-10 mx-auto p-8 bg-gray-900 shadow-lg rounded-lg">
            <h1 className="  text-2xl md:text-3xl font-semibold text-center text-white mb-8">Sales Update Form</h1>
            <form onSubmit={handleSubmit} className="  space-y-1 md:space-y-6">

                {/* Date Field */}
                <div>
                    <label className="block text-lg font-medium text-white">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className=" mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    />
                </div>

                {/* Fields with Flex Layout for Parallel Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2  gap-3 md:gap-6">
                    {/* Total Revenue Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Total Revenue</label>
                        <input
                            type="number"
                            name="totalRevenue"
                            value={formData.totalRevenue}
                            onChange={handleChange}
                            required
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    {/* Total Units Sold Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Total Units Sold</label>
                        <input
                            type="number"
                            name="totalUnitsSold"
                            value={formData.totalUnitsSold}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    {/* Total Transactions Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Total Transactions</label>
                        <input
                            type="number"
                            name="totalTransactions"
                            value={formData.totalTransactions}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    {/* Total Returns Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Total Returns</label>
                        <input
                            type="number"
                            name="totalReturns"
                            value={formData.totalReturns}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    {/* Net Revenue Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Net Revenue</label>
                        <input
                            type="number"
                            name="netRevenue"
                            value={formData.netRevenue}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    {/* Discounts Given Field */}
                    <div>
                        <label className="block text-lg font-medium text-white">Discounts Given</label>
                        <input
                            type="number"
                            name="discountsGiven"
                            value={formData.discountsGiven}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Payment Methods Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-lg font-medium text-white">Cash Payments</label>
                        <input
                            type="number"
                            name="cashPayment"
                            value={formData.cashPayment}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-white">Credit Card Payments</label>
                        <input
                            type="number"
                            name="creditCardPayment"
                            value={formData.creditCardPayment}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-white">Bank Transfer Payments</label>
                        <input
                            type="number"
                            name="bankTransferPayment"
                            value={formData.bankTransferPayment}
                            onChange={handleChange}
                            className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Remarks Field */}
                <div>
                    <label className="block text-lg font-medium text-white">Remarks</label>
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 md:mt-2 w-full px-4 py-2 md:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full mt-4 bg-white hover:bg-black text-black hover:text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Sales;
