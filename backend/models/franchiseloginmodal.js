var mongoose= require("mongoose")
var franchiseloginSchema= new mongoose.Schema({
    iDEmail:{type:String,
    
},
iDPassword:{
type:String,
   
},
});


var FranchiseLoginModal= mongoose.model("loginmodal",franchiseloginSchema);
module.exports=FranchiseLoginModal