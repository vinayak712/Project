import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from 'bcrypt'
import cloudinary from'cloudinary'
import { createConnection } from "mongoose";

async function Signup(req, res) {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ Message: "All fields are required" });
        }
        if (password.length < 6) {
          return  res.status(400).json({ Message: "The password length must be greater than 6" });
        }
        const user = await User.findOne({ email });
        if (user) {
           return res.status(400).json({ Message: "User Already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            password: hashedPassword,
            email
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilepic: newUser.profilepic,
            });
        }
        else {
            return res.status(400).json({ Message: "Invaild Detailes" })
        }
    }
    catch (error) {
        console.log("Error in signUp page ", error.message);
        res.status(400).json({ Message: "Internal Server Error" });
        
    }
   
}


 async function Login(req,res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ Message: 'Invalid Creandistials' });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ Message: 'Invalid Creandistials' });
        }
        generateToken(user._id, res);

            res.status(200).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                profilepic: user.profilepic,

            })
        }
    
    catch (error) {
        res.status(400).json({Message:'Invalid Please check again'})
    }
}

function Logout(req, res) {
    
    try {
        res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("Successfully LogOut")
    } catch (error) {
        res.status(400).json("Error While LogOut" + error.message);
}
      

}
// // Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function Update(req, res) {
    try {
        const { profilepic } = req.body; 
        if (!profilepic) {
            return res.status(400).json("Profile Pic is Required"); 
        }

        const userId = req.user._id; // Extract user ID from the Protect middleware

        // Upload the profile picture to Cloudinary
        const uploadR = await cloudinary.uploader.upload(profilepic);
        console.log("Cloudinary Response:", uploadR);
        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilepic: uploadR.secure_url },
            { new: true } 
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in Updating Profile Pic:", error.message);
        return res.status(500).json("Internal Server Error");
    }
}




// // Update Profile Controlle
//   const Update = async (req, res) => {
//   try {
//     const { profilepic } = req.body; // base64Image from frontend
//     let imageUrl = '';

//     // Upload only if the profile picture is provided
//     if (profilepic) {
//       const uploadResponse = await cloudinary.v2.uploader.upload(profilepic, {
//         folder: 'profile_pics',
//         transformation: [{ width: 500, height: 500, crop: 'limit' }],
//       });
//       imageUrl = uploadResponse.secure_url; // Get Cloudinary URL
//     }

//     // Update User with new profile pic
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { profilepic: imageUrl || req.user.profilepic }, // Retain old pic if no new pic
//       { new: true }
//     );

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Profile update error:', error.message);
//     res.status(500).json({ message: 'Profile update failed' });
//   }
// };

 
 function CheckAuth(req, res) {
 try {
    res.status(200).json(req.user);
 } catch (error) {
     console.log('Error in checking Authentication' + error.message);
     res.status(400).json({ Message: "Internal Server error" }); 
 }

}
export { Signup, Login, Logout,Update,CheckAuth };
