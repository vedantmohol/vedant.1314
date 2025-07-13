import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/emailSender.js";

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

export const signOut = async(req,res,next) =>{
    try{
        res.clearCookie('access_token').status(200).json("Signout successful!");
    }catch(err){
        next(err);
    }
}

const otpStore = new Map(); 

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);

  try {
    await sendEmail(
      email,
      "Your OTP for Contact Verification",
      `Your OTP is: ${otp}`
    );

    res.status(200).json({ message: "OTP sent to email successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);
  if (storedOtp && storedOtp === otp) {
    otpStore.delete(email); 
    res.status(200).json({ message: "OTP verified successfully.", verified: true });
  } else {
    res.status(400).json({ message: "Invalid OTP." });
  }
};