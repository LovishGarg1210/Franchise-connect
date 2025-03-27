import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

// Helper function to calculate age based on birthdate
const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const ageDiff = new Date() - birthDate;
    return Math.floor(ageDiff / (365.25 * 24 * 60 * 60 * 1000));
};

function EmployeeCard({ employee, onEdit, onDelete }) {
    const age = calculateAge(employee.birthdate);

    return (
        <div className="max-w-xs w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <img
                    src={`http://localhost:3000/images/${employee.photo}`}
                    alt={employee.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center text-gray-800">{employee.name}</h2>
                <p className="text-center text-gray-600">{employee.jobTitle}</p>
                <div className="mt-4 text-center">
                    <p className="text-lg font-medium text-gray-700">Age: {age}</p>
                </div>

                <div className="flex justify-center mt-4 space-x-4">
                    <button onClick={() => onEdit(employee)} className="text-blue-500">Edit</button>
                    <button onClick={() => onDelete(employee._id)} className="text-red-500">Delete</button>
                </div>
            </div>
        </div>
    );
}

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        birthdate: '',
        photo: null,
        email: ''
    });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper function to get email from localStorage
    const getStoredEmail = () => {
        try {
            const email = localStorage.getItem('useremail');
            // Remove any extra quotes and return clean email
            return email ? email.replace(/^"|"$/g, '') : '';
        } catch (error) {
            console.error('Error parsing email from localStorage:', error);
            return '';
        }
    };

    const fetchEmployees = async () => {
        try {
            const email = getStoredEmail();
            const response = await axios.get('http://localhost:3000/Employee/dofind');
            const filteredEmployees = response.data.data.filter((user) => user.email === email);
            setEmployees(filteredEmployees);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        const email = getStoredEmail();
        if (email) {
            setFormData(prevData => ({
                ...prevData,
                email: email,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevData => ({
                ...prevData,
                photo: file
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            jobTitle: '',
            birthdate: '',
            photo: null,
            email: getStoredEmail()
        });
        setEditingEmployee(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const email = getStoredEmail();
            if (!email) {
                alert('Email not found in local storage!');
                return;
            }

            const form = new FormData();
            form.append('name', formData.name);
            form.append('jobTitle', formData.jobTitle);
            form.append('birthdate', formData.birthdate);
            form.append('email', email);
            if (formData.photo) {
                form.append('photo', formData.photo);
            }

            if (editingEmployee) {
                await axios.put(
                    `http://localhost:3000/Employee/doupdate/${editingEmployee._id}`,
                    form,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
            } else {
                await axios.post(
                    'http://localhost:3000/Employee/dosend',
                    form,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
            }

            // Fetch updated employee list
            await fetchEmployees();
            
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error saving employee data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData({
            name: employee.name,
            jobTitle: employee.jobTitle,
            birthdate: employee.birthdate.split('T')[0], // Format date properly
            photo: null,
            email: employee.email
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:3000/Employee/dodelete/${id}`);
                await fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
                alert('Error deleting employee. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <div className="flex justify-end w-[90%] mx-auto">
                <button
                    className="bg-gray-700 mt-10 w-40 flex p-3 text-white text-center"
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    disabled={isLoading}
                >
                    <Plus /> Add Employee
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {employees.map((employee) => (
                    <EmployeeCard
                        key={employee._id}
                        employee={employee}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {isModalOpen && (
                <div className=" w-[100%]  fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg md:w-[30%] w-[90%]">
                        <h2 className="text-2xl font-semibold mb-4">
                            {editingEmployee ? 'Edit Employee' : 'Add Employee'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Birthdate</label>
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Upload Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md"
                                    required={!editingEmployee}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        resetForm();
                                    }}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EmployeeList;