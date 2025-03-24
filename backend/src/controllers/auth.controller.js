
import { generateToken } from "../lib/utils.js";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";
 


//signup
export const signup = async (req, res) => {
    const {fullName,email,password} = req.body;
    try {
        if (!fullName || !email || !password) {
              return res.status(400).json({message: "All fields are required"}); 
         } //check if all fields are provided

       if (password.length < 6) {
           return res.status(400).json({message: "Password must be at least 6 characters long"});
       } //check password length
       const user = await Users.findOne({email})
         if (user) {
              return res.status(400).json({message: "User already exists"});
         } //check if user exists   

       const salt = await bcrypt.genSalt(10);//generate salt
       const hashPassword = await bcrypt.hash(password, salt);//hash password

       const newUser = new Users({
           fullName,
           email,
           password: hashPassword
       })//create new user
       if (newUser) {
            //geneate jwt token here
            generateToken(newUser._id,res)
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });


          
       } else {
           return res.status(400).json({message: "Failed to create user"});
       }


        
    } catch (error) {
        console.log("Error on signup controller", error.message);
        return res.status(500).json({message: "Internal server error"});
    }

   
};


//login
export const login = async(req, res) => {
    const {email,password} = req.body;
   try {
    const user= await Users.findOne({email})//find user by email
    if (!user) {
        return res.status(400).json({message: "Invalid credentials"});
    }//check if user exists
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid credentials"});
    }//check if password is correct
    //generate jwt token here
    generateToken(user._id,res)
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
    });

   } catch (error) {
    console.log("Error on login controller", error.message);
    return res.status(500).json({message: "Internal server error"});
   }
};


//logout
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt","",{maxAge: 0});//clear cookie
        return res.status(200).json({message: "Logout successful"}); 
    } catch (error) {
        console.log("Error on logout controller", error.message);
        return res.status(500).json({message: "Internal server error"});
    }  
};


//update profile
export const updateProfile = async (req, res) => {}