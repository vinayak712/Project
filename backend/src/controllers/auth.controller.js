import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from 'bcrypt'

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
    // res.send("Signup page");
}



function Login(req,res) {
    res.send("Logon page");
}

function Logout(req, res) {
    
        res.send('Logout page')

}
export { Signup, Login, Logout };