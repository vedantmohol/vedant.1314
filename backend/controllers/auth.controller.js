import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async(req,res) =>{
    const { username, password, email } = req.body;

    if(!username || !password || !email || username==='' || password==='' || email===''){
        return res.status(400).json({ message: "Please fill all the fields"});
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
        res.status(500).json({message: error.message});
    }
}