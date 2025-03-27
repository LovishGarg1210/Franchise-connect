import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    expenseDate: '',
    expenseCategory: '',
    expenseAmount: '',
    expenseDescription: '',
    email: ''
  });
  const [editExpense, setEditExpense] = useState({
    _id: '',
    expenseDate: '',
    expenseCategory: '',
    expenseAmount: '',
    expenseDescription: '',
    email: ''
  });

  // Fetch expenses function
  const fetchExpenses = async () => {
    try {
      const userEmail = JSON.parse(localStorage.getItem('useremail'));
      const response = await axios.get('https://franchise-connect-1.onrender.com//expense/dofind');
      const filteredExpenses = response.data.data.filter((expense) => expense.email === userEmail);
      setExpenses(filteredExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Initialize the email and fetch expenses on page load
  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('useremail'));
    if (userEmail) {
      setNewExpense((prevState) => ({
        ...prevState,
        email: userEmail
      }));
      setEditExpense((prevState) => ({
        ...prevState,
        email: userEmail
      }));
    }
    fetchExpenses();
  }, []);

  // Handle input changes for adding a new expense
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for editing an expense
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for adding a new expense
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://franchise-connect-1.onrender.com//expense/dosave', newExpense);
      console.log('New expense added:', newExpense);
      fetchExpenses();  // Fetch updated expenses list
      setIsAddModalOpen(false);  // Close modal
      setNewExpense({
        expenseDate: '',
        expenseCategory: '',
        expenseAmount: '',
        expenseDescription: '',
        email: newExpense.email
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Handle form submission for updating an expense
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://franchise-connect-1.onrender.com//expense/doupdate/${editExpense._id}`, editExpense);
      console.log('Expense updated:', editExpense);
      fetchExpenses();  // Fetch updated expenses list
      setIsEditModalOpen(false);  // Close modal
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  // Handle expense deletion
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://franchise-connect-1.onrender.com//expense/dodelete/${_id}`);
      console.log('Expense deleted:', _id);
      fetchExpenses();  // Fetch updated expenses after delete
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Open modal for editing an expense
  const openEditModal = (expense) => {
    setEditExpense(expense);
    setIsEditModalOpen(true);
  };

  // Open modal for adding a new expense
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="  text-xl md:text-xl font-semibold">Expenses Management</h2>
        <button
          className="bg-gray-900 text-white me-1 px-2 md:px-4  py-1 md:py-2  rounded-lg flex items-center gap-2"
          onClick={openAddModal} // Open modal for adding a new expense
        >
          <Plus size={20}  />
          <h1 className='hidden md:block'>Add Expense</h1>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expenseDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.expenseCategory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.expenseAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expenseDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openEditModal(expense)} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for adding a new expense */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg   w-[90%] md:w-1/3">
            <h3 className="  text-xl font-semibold mb-4">Add New Expense</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="expenseDate"
                  value={newExpense.expenseDate}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full p-3 border-gray-500 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="expenseCategory"
                  value={newExpense.expenseCategory}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="expenseAmount"
                  value={newExpense.expenseAmount}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  id="description"
                  name="expenseDescription"
                  value={newExpense.expenseDescription}
                  onChange={handleAddInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit" // This is the submit button for the form
                  className="bg-gray-900 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for editing an expense */}
      {isEditModalOpen && (
        <div className="fixed  inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full border border-3 border-red-300  p-6 rounded-lg  md:w-1/3 w-[90%]">
            <h3 className="text-xl font-semibold mb-4">Edit Expense</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="expenseDate"
                  value={editExpense.expenseDate}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full p-3 border-gray-500 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="expenseCategory"
                  value={editExpense.expenseCategory}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="expenseAmount"
                  value={editExpense.expenseAmount}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  id="description"
                  name="expenseDescription"
                  value={editExpense.expenseDescription}
                  onChange={handleEditInputChange}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit" // This is the submit button for the form
                  className="bg-gray-900 text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;