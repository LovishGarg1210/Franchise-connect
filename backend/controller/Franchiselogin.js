var FranchiseLoginModal=require("../models/franchiseloginmodal.js")
const jsonwebtoken=require("jsonwebtoken")

const docheckuser = async (req, res) => {
    const { email, password } = req.body;  // Destructuring to extract specific fields (if required)
    
    try {
        // Ensure you're searching by necessary fields (e.g., email and password)
        const user = await FranchiseLoginModal.findOne({ iDEmail :  email  });

        if (!user) {
            return res.status(201).json({ message: "User not found" });
        }
        if(user.iDPassword!== password){
            return res.status(202).json({ message: "Invalid password" });}

        // If the user is found, respond with user data or some token if you're doing authentication
        
        let jtoken=jsonwebtoken.sign({uid:req.body.email},process.env.SEC_KEY);

        res.cookie("token", jtoken , {
            maxAge : 1000 *60*60*24,
            httpOnly : true,
            secure : false,
            sameSite : "none",  // Set this to "none" for HTTPS only cookies
        })


        console.log('message',user)
        return res.status(200).json({ message: "User found", user,jtoken });
        
    } catch (error) {
        console.error("Error occurred during user check:", error); // for debugging
        return res.status(500).json({ message: "Server error" });
    }
};
const dofindfranchisyusers=async(req,res)=>{
    try {
        const data=await FranchiseLoginModal.find({})
        if(!data)
            return res.status(404).json({message:"No users found"})
        
        return res.status(201).json({message:"data found",data})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error: "+error.message})
    }
 
}
 module.exports={docheckuser,dofindfranchisyusers}
