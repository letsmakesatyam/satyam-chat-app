import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
    const { email, fullname, password } = req.body;
    try{
        if(!email || !fullname || !password){
            return  res.status(400).json({ message: "All fields are required." });
        }   
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        const user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: "User with this email already exists." });
        }   
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            fullname, 
            password: hashedPassword

        })
        if(newUser){
            generateToken(newUser._id , res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname, 
                profilePic: newUser.profilePic
            }); 

        }
        else{

            console.log("Error creating user");
            res.status(500).json({ message: "Invalid data" });
        }


    }catch(err){
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
    
}
export const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required." });
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "This user doesn't exist." });
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials." });
        }   
        await generateToken(user._id , res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname, 
            profilePic: user.profilePic,
            
            
        }); 
        


    }catch(err){
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server Error" });  
    }
}   
export const logout = (req, res) => {
    try{
        res.cookie('token', '', {    
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',
            maxAge: 0
        });
        res.status(200).json({ message: "Logged out successfully." });  

    }catch(err){
        console.error("Logout Error:", err);
        res.status(500).json({ message: "Server Error" });  
    }
}   
export const updateProfile = async (req, res) => {
    // Implementation for updating user profile
    const {profilePic} = req.body;
    try{
        const userId = req.user._id;
        const imageResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic : imageResponse.secure_url },
            { new: true }
        );  
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            fullname: updatedUser.fullname,
            profilePic: updatedUser.profilePic
        });


    }
    catch(err){
        console.error("Update Profile Error:", err);
        res.status(500).json({ message: "Server Error" });

    }   
};
export const checkAuth = async (req, res) => {
    try{
        const user = req.user._id;
        
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            profilePic: user.profilePic
        });
    }
    catch(err){
        console.error("Check Auth Error:", err);
        res.status(500).json({ message: "Server Error" });
    }   
};
