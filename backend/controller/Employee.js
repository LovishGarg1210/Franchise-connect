const Employee = require("../models/employee");

const dosaveEmployee = async (req, res) => {
    const data = req.body;
    const file = req.file;

    try {
        const response = await new Employee({
            name: data.name,
            jobTitle: data.jobTitle,
            birthdate: data.birthdate,
            email: data.email,
            photo: file.filename
        }).save();

        if (!response) {
            return res.status(400).json({ message: "Failed to save employee" });
        }
        res.status(201).json({ data: response });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const dofindEmployee = async (req, res) => {
    try {
        const response = await Employee.find({});
        if (!response) {
            return res.status(404).json({ message: "No employee found" });
        }
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const file = req.file;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update employee data
        employee.name = data.name || employee.name;
        employee.jobTitle = data.jobTitle || employee.jobTitle;
        employee.birthdate = data.birthdate || employee.birthdate;
        employee.email = data.email || employee.email;

        // Update photo if new one is uploaded
        if (file) {
            employee.photo = file.filename;
        }

        // Save the updated employee
        const updatedEmployee = await employee.save();

        res.status(200).json({ data: updatedEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { dosaveEmployee, dofindEmployee, updateEmployee, deleteEmployee };
