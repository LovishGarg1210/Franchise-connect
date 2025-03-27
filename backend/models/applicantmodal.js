var mongoose = require('mongoose');
const applicantSchema=new mongoose.Schema({
    firstName:{
        type:String,
    required: true,
    trim: true,
   },
    lastName: {
        type: String,
        required: true,
        trim: true,
       
    },
    email: {
        type: String,
        required: true,
        trim: true,
       
      
    },
    phone: {
        type: String,
        required: true,
        trim: true,
       
       
    },
    Resident:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
       
    },
    city: {
        type: String,
        required: true,
        trim: true,
       
    },
    state: {
        type: String,
        required: true,
        trim: true,
       
    },
    
   Area:{
    type: String,
    required: true
   }
  ,
    experience: {
        type: String,
        required: true
    },
    status:{
  
 type: String,
 
   
    // Default value for status is "pending"
    default: "pending"
    }, 
     date: {
        type: Date,
        default: Date.now, // Default value is the current date and time
      },
      idPass: { // New field for storing the ID pass
        type: String,
        default: null
      },
      iDEmail:{
        type: String,
        default: null
      },
      iDPassword:{
        type: String,
        default: null
      },
  
  
})
const franchisemodal=mongoose.model("applicantdata",applicantSchema)
module.exports =franchisemodal