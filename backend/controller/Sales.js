const Sales = require("../models/Saleupdatemodal.js");

const dosales = async (req, res) => {
    const salesData = req.body;

    // Log the incoming data to see what you're receiving
    console.log('Received sales data:', salesData);

    // You can also check if the required fields are present in the body
    if (!salesData || !salesData.someField) {
        return res.status(400).json({ message: "Missing required sales data" });
    }

    try {
        // Try to create a new sales entry using Sales.create()
        const data = await Sales.create(salesData);

        // Check if the data was created successfully
        if (!data) {
            return res.status(400).json({ message: "Failed to create sales" });
        }

        // Successfully created sales entry
        res.status(201).json({ message: "Sales created successfully", data });

    } catch (error) {
        // Log the error for more insight
        console.error("Error creating sales:", error);

        // Return a more detailed error message
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

const dofindSales = async(req, res) => {
    try {
        const data = await Sales.find({});
        if(!data)
            return res.status(404).json({message: "No sales found"});
        res.status(200).json({message: "Data found", data});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error: " + error.message});
    }
};

const updateSale = async(req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedSale = await Sales.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale updated successfully", data: updatedSale });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

const deleteSale = async(req, res) => {
    const { id } = req.params;
    try {
        const deletedSale = await Sales.findByIdAndDelete(id);
        if (!deletedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
};

module.exports = {
    dosales,
    dofindSales,
    updateSale,
    deleteSale
};