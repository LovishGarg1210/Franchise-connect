var express = require('express');
var obj=require("../controller/applicant.js")
const applicantrouter=express.Router();

applicantrouter.post('/dosend',obj.doftechapplicant)
applicantrouter.get('/dofetch',obj.dofindapplicants)
applicantrouter.get('/dochngestatus/:id/:status',obj.dochngestatus)

module.exports=applicantrouter;