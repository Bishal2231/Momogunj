 import { User } from "../model/user.model.js"
 import bcryptjs from "bcryptjs"
 import { sendVerificationEmail } from "../mailtrap/email.js"
 import { generateVerificationCOde } from "../utility/generateVerificationCode.js"
 import { generateTokenAndSetCookie } from "../utility/generateTokenAndSetCookie.js"
 export const signup=async (req,res)=>{
    try {
    const {email,password,name}=req.body

    if(!email||!password||!password){
        throw new Error("invalid email")
    }

    const userAlreadyExits=await User.findOne({email})

    if(userAlreadyExits){
        return res.status(400).json({success:false,message:"user already exits"})
    }
    const hashPassword=await bcryptjs.hash(password,10)

     const verificationToken=  generateVerificationCOde()
     
    const user=new User({
        email,
        password:hashPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000
    
    
    
    
        
    })
    await user.save()
    console.log(user)

    generateTokenAndSetCookie(res,user._id)
    await sendVerificationEmail(user.email,verificationToken)

    res.status(200).json({
        success:true,
        message:"sing up successful",
        user:{
            ...user._doc,
            password:undefined
        }

    })



    } 
    catch (error) {
console.log(error)}



}

export const login=async (req,res)=>{
    res.send("<h2> login routex</h2>")
}

export const logout=async (req,res)=>{
    res.send("<h2> logout routex</h2>")
}