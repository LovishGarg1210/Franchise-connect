
var  dotenv =require("dotenv")
var  express =require('express');
var connectDB=require("../backend/db/index.js")
const cookieparser=require("cookie-parser")


const path = require('path')
dotenv.config()

const PORT= process.env.PORT
var app=express();
app.use(cookieparser());
connectDB().then(()=>{
    app.listen(PORT,()=>{
   
        console.log(`server is running ${PORT}`);
    })
 }).catch(()=>{
    console.log('Failed to connect to DB');
  
})

app.use(express.json());
app.use(express.urlencoded())
// app.use(express.static('public'))
var cors=require("cors");
app.use(cors())
// Q3jrDucJ32OCoqcL

app.use("/images" , express.static(path.join(__dirname , "./public/temp")))




const applicantrouter=require("./routes/applicantroute")
const franchiseloginRouter=require("./routes/franchiseloginroute")
const Salesrouter=require("./routes/salesrouter")
const EmployeeRouter=require("./routes/Emloyeerouter")
const ExpenseRouter=require("./routes/expenseRouter.js")
app.use("/applicant",applicantrouter)
app.use("/franchise",franchiseloginRouter)
app.use("/sales",Salesrouter)
app.use("/Employee",EmployeeRouter)

app.use("/expense",ExpenseRouter)
   
   

