import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';


//protect route function
export const protectRoute = async (req, res, next) => {
    try {//try block
        const token = req.cookies.jwt;//get token from cookies
        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)//verify token
        if (!decoded) {
            return res.status(401).json({message: "Unauthorized-Invalid Token"});//if token is invalid
        }
        const user = await Users.findById(decoded.id).select("-password");//select all fields except password
        if (!user) {
            return res.status(404).json({message: "Unauthorized-User not found"});//if user is not found
        }
        req.user = user;//set user to request object
        next();//move to next middleware
    } catch (error) {
        console.log("Error on protectRoute middleware", error.message);
        return res.status(500).json({message: "Internal server error"});
    }

}