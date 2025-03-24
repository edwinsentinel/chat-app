import express from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();


//signup
router.post("/signup",signup );


//login
router.post("/login",login);


//logout
router.post("/logout",logout);

//update profile
router.put("/updateProfile",protectRoute,updateProfile);


export default router;