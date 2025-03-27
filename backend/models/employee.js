const  mongoose=require("mongoose") 
const employeeSchema= new mongoose.Schema({
    name:{type:String,required:true},
   
    jobTitle:{type:String,required:true},
    
    birthdate:{type:String,required:true},
    photo:{type:String,default:null},
    email:{type:String,default:''},
})

const Employee=mongoose.model("Employee",employeeSchema)
module.exports=Employee;