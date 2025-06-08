import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async(req,res,next) =>{
    const { username, password, email } = req.body;

    if(!username || !password || !email || username==='' || password==='' || email===''){
        next(errorHandler(400,"All fields are required"));
    } 

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username, 
        email,
        password: hashedPassword,
    })

    try{
        await newUser.save();
        res.json("Signup successfull!");
    }catch(error){
        next(error);
    }
}