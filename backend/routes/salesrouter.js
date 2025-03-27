var express=require('express');
var Salesrouter=express.Router()

var obj=require("../controller/Sales.js")

Salesrouter.post('/dosale',obj.dosales);

Salesrouter.get('/dofindsale',obj.dofindSales);
Salesrouter.put('/doupdatesale/:id',obj. updateSale);
Salesrouter.delete('/dodeletesale/:id',obj. deleteSale);
module.exports=Salesrouter