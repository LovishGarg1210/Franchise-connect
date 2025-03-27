var express = require('express');
var EmployeeRouter = express.Router();
const { upload } = require("../utility/multer");

var obj = require("../controller/Employee");

// Existing routes
EmployeeRouter.post("/dosend", upload.single('photo'), obj.dosaveEmployee);
EmployeeRouter.get("/dofind", obj.dofindEmployee);

// New routes for updating and deleting employees
EmployeeRouter.put("/doupdate/:id", upload.single('photo'), obj.updateEmployee);
EmployeeRouter.delete("/dodelete/:id", obj.deleteEmployee);

module.exports = EmployeeRouter;
