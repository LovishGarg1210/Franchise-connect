const nodemailer=require("nodemailer")

const franchisemodal=require("../models/applicantmodal.js")
const FranchiseLoginModal=require("../models/franchiseloginmodal.js")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lgarg1210@gmail.com',
      pass: 'shnkesgenxywenkq',
    },
  });
const doftechapplicant = async (req, res) => {
    try {
      // 1. Destructure applicant data from the request body
      const applicantData = req.body;
  
      
      // 3. Check if applicant already exists by email or phone (for example)
      const existingApplicant = await franchisemodal.findOne({
        $or: [{ email: applicantData.email }, { phone: applicantData.phone }]
      });
  
      if (existingApplicant) {
        return res.status(401).json({ message: "Applicant with the same email or phone already exists." });
      }
  
      // 4. Create the new applicant in the database
      const data = await franchisemodal.create(applicantData);
    // Send an SMS

      const mailOptions = {
        from: 'lgarg1210@gmail.com',
        to: applicantData.email,
        subject: 'Welcome to Our Service!',
        text: `Hello  ${applicantData.firstName},\n\nThank you for registering with us! We are excited to have you on board.\n\nBest regards,\nYour Company`,
        html: `<p>Hello ${applicantData.firstName},</p><p>Thank you for registering with us! We are excited to have you on board.</p><p>Best regards,<br>Your Company</p>`,
      };

      // 5. Send the email
      
      
      // 5. Handle successful creation
      res.status(201).json({
          message: "Application successfully submitted",
          data
        });
        
        await transporter.sendMail(mailOptions) 
    } catch (error) {
      // 6. Catch and log errors for debugging
      console.error("Error creating applicant:", error);
      return res.status(500).json({ error: "Internal Server Error: " + error.message });
    }
  };
const dofindapplicants=async(req,res)=>{
  try {
    const data=await franchisemodal.find({})
    if(!data)
       return res.status(404).json({
      message:"No applicants found"
    })
    return res.status(201).json({
      message:"data found",data
    })
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error: " + error.message
    })
    
  }
};
const dochngestatus = async (req, res) => {
  try {
    const { id, status } = req.params;  // Destructure id and status from params
    const user = await franchisemodal.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "No applicant found"
      });
    }

    // Check for valid status
    if (!["pending", "completed", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status provided"
      });
    }
    if (status === "completed") {
      // Generate the ID pass (this could be a random string, unique ID, etc.)
      const idPass = `ID-${user.firstName}-${user.email.slice(3,8)}-${Math.floor(Math.random() * 10000)}`; 
      const iDEmail=`${user.email.slice(0,5)}-${Math.floor(Math.random() *10000)}-@gmail.com`;
      const iDPassword=`${user.email.slice(0,5)}-${Math.floor(Math.random() *10000)}-${user.firstName}`;
      user.iDPassword=iDPassword;
      user.iDEmail=iDEmail;// Example of ID pass
      user.idPass = idPass; // Assign the generated ID pass to the user
    } else if (status === "rejected") {
      // If status is being set to rejected, remove the ID pass
      user.idPass = null;
      user.iDEmail= null;
      user.iDPassword= null;

    }
    // Update the user's status based on the request
    user.status = status;
    
    const mailOptions = {
      from: 'lgarg1210@gmail.com',
      to: user.email,
      subject: 'Here is your login details',
      text: `Hello  ${user.firstName},\n\nThank you for registering with us! We are excited to have you on board. Here is your details IDEMAIL:${user.iDEmail},\n IDPASSWORD:${user.iDPassword}.\n\nBest regards,\nYour Company`,
      html: `<p>Hello ${user.firstName},</p><p>Thank you for registering with us! We are excited to have you on board.</p>.<p>Here is your details IDEMAIL:${user.iDEmail},<br> IDPASSWORD:${user.iDPassword}.</p><p>Best regards,<br>Your Company</p>`,
    };

 
   
    // Save the updated user
    await user.save();
    await FranchiseLoginModal.create({
      iDEmail:user.iDEmail,
      iDPassword:user.iDPassword,
      
    })

    // Send a success response
     res.status(200).json({
      message: `Status updated to ${status} successfully`,
      user
    });
    
    await transporter.sendMail(mailOptions) 

  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message
    });
  }
};

module.exports={doftechapplicant,dofindapplicants,dochngestatus}



