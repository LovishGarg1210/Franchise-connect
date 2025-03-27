var express=require("express");
var franchiseloginRouter=express.Router();
var obj=require("../controller/Franchiselogin.js")

franchiseloginRouter.post('/dologin',obj.docheckuser)
franchiseloginRouter.get('/dofind',obj.dofindfranchisyusers)
module.exports=franchiseloginRouter;