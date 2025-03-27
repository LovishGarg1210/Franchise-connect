import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, PencilLine } from "lucide-react";

function SalesHistory() {
    const [salesData, setSalesData] = useState([]);
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const Email = JSON.parse(localStorage.getItem('useremail'));
            const response = await axios.get("https://franchise-connect-1.onrender.com/sales/dofindsale");
            const response2 = response.data.data.filter((user) => user.email === Email);
            setSalesData(response2);
            setFilteredSalesData(response2);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (saleId) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`https://franchise-connect-1.onrender.com/sales/dodeletesale/${saleId}`);
                fetchData();
            } catch (error) {
                console.error("Error deleting sale:", error);
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://franchise-connect-1.onrender.com/sales/doupdatesale/${selectedSale._id}`, selectedSale);
            setIsUpdateModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error updating sale:", error);``
        }
    };

    const handleUpdateModalOpen = (sale) => {
        setSelectedSale({ ...sale });
        setIsUpdateModalOpen(true);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    useEffect(() => {
        let filtered = [...salesData];
        if (selectedYear) {
            filtered = filtered.filter(sale => new Date(sale.date).getFullYear() === parseInt(selectedYear));
        }
        if (selectedMonth) {
            filtered = filtered.filter(sale => new Date(sale.date).getMonth() === parseInt(selectedMonth) - 1);
        }
        if (selectedDate) {
            filtered = filtered.filter(sale => new Date(sale.date).getDate() === parseInt(selectedDate));
        }
        setFilteredSalesData(filtered);
    }, [selectedYear, selectedMonth, selectedDate, salesData]);

    const getUniqueValues = (field) => {
        const values = salesData.map(sale => {
            const date = new Date(sale.date);
            if (field === 'FullYear') return date.getFullYear();
            if (field === 'Month') return date.getMonth() + 1;
            if (field === 'Date') return date.getDate();
            return null;
        });
        return [...new Set(values)];
    };

    return (
        <div className="w-full  mx-auto px-4 py-8 bg-gray-50 shadow-lg rounded-lg overflow-hidden">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">Sales History</h1>

            {/* Filters Section */}
            <div className="mb-6 flex md:flex-row flex-col gap-2  space-4 justify-center">
                <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="px-4 py-2 border rounded-md bg-white"
                >
                    <option value="">Select Year</option>
                    {getUniqueValues('FullYear').map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="px-4 py-2 border rounded-md bg-white"
                >
                    <option value="">Select Month</option>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>

                <select
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="px-4 py-2 border rounded-md bg-white"
                >
                    <option value="">Select Day</option>
                    {getUniqueValues('Date').map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {/* Sales Table */}
            <div className='  w-full overflow-x-auto md:overflow:hidden '>
                <table className="min-w-full  bg-white table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Total Revenue</th>
                            <th className="px-4 py-2 text-left">Units Sold</th>
                            <th className="px-4 py-2 text-left">Transactions</th>
                            <th className="px-4 py-2 text-left">Returns</th>
                            <th className="px-4 py-2 text-left">Net Revenue</th>
                            <th className="px-4 py-2 text-left">Cash Payments</th>
                            <th className="px-4 py-2 text-left">Credit Card Payments</th>
                            <th className="px-4 py-2 text-left">Bank Transfer Payments</th>
                            <th className="px-4 py-2 text-left">Discounts Given</th>
                            <th className="px-4 py-2 text-left">Remarks</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalesData.map((sale, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2">{sale.date}</td>
                                <td className="px-4 py-2">{sale.totalRevenue}</td>
                                <td className="px-4 py-2">{sale.totalUnitsSold}</td>
                                <td className="px-4 py-2">{sale.totalTransactions}</td>
                                <td className="px-4 py-2">{sale.totalReturns}</td>
                                <td className="px-4 py-2">{sale.netRevenue}</td>
                                <td className="px-4 py-2">{sale.cashPayment}</td>
                                <td className="px-4 py-2">{sale.creditCardPayment}</td>
                                <td className="px-4 py-2">{sale.bankTransferPayment}</td>
                                <td className="px-4 py-2">{sale.discountsGiven}</td>
                                <td className="px-4 py-2">{sale.remarks}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleUpdateModalOpen(sale)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <PencilLine className="h-4 w-4 text-blue-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sale._id)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Update Sale Record</h2>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        {selectedSale && (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedSale.date.split('T')[0]}
                                        onChange={(e) => setSelectedSale({...selectedSale, date: e.target.value})}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Revenue
                                    </label>
                                    <input
                                        type="number"
                                        value={selectedSale.totalRevenue}
                                        onChange={(e) => setSelectedSale({...selectedSale, totalRevenue: e.target.value})}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Units Sold
                                    </label>
                                    <input
                                        type="number"
                                        value={selectedSale.totalUnitsSold}
                                        onChange={(e) => setSelectedSale({...selectedSale, totalUnitsSold: e.target.value})}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Remarks
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedSale.remarks}
                                        onChange={(e) => setSelectedSale({...selectedSale, remarks: e.target.value})}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsUpdateModalOpen(false)}
                                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    ); 
} export default SalesHistory;


