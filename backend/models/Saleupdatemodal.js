const mongoose = require('mongoose');

// Define the schema for the sales data
const salesSchema = new mongoose.Schema( {
   
    date: {
      type: String,
    
      required: true,
    
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
    totalUnitsSold: {
      type: Number,
      required: true,
    },
    totalTransactions: {
      type: Number,
      required: true,
    },
    totalReturns: {
      type: Number,
      required: true,
    },
    netRevenue: {
      type: Number,
      required: true,
    },

    cashPayment: {
        type: Number,
        default: 0,
      },
      creditCardPayment:{
        type: Number,
        default: 0,
      },
      bankTransferPayment:  {
        type: Number,
        default: 0,
      },

    discountsGiven: {
      type: Number,
      default: 0,
    },
    remarks: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Sales model using the schema
const Sales = mongoose.model('Sales', salesSchema);

// Export the model
module.exports = Sales;
