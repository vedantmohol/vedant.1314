import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signIn = async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password || email==='' || password===''){
        return next(errorHandler(400,"All fields are required"));
    }
    
    try{
        const validUser = await User.findOne({email});

        if(!validUser){
            return next(errorHandler(400, "User not found, Invalid User!"));
        }

        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password!"));
        }
        
        const token = jwt.sign(
            {id: validUser._id, isAdmin: validUser.isAdmin},
            process.env.JWT_SECRET
        );

        const {password: pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token',token,{httpOnly: true}).json(rest);

    }catch(err){
        next(err)
    }
}