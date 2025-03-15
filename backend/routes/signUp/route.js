import { Router } from "express";
import { User } from "../../Schemmas/userSchemma.js";
import UploadFileOnClodinary from "../../utils/clodinary.js";
import multer from "multer";
import { upload } from "../../middleware/multerMiddleware.js";
export const router = Router()

router.post("/api/createuser", upload.single('file'), async (req, res) => {
    try {
        const { name, email, password, PhoneNo } = req.body
        //CATCH IF user exists with an existing email
        const userExits = await User.findOne({
            email
        })
        if (userExits) {
            return res.status(402).json({
                status: false,
                message: "user Already exists"
            })
        }
        let profilePic = ""
        if(req.file?.path){
            const {secure_url} = await UploadFileOnClodinary(req.file.path)
            profilePic = secure_url
        }
        const newUser = new User({
            name, email, password, PhoneNo, profilePic
        })
        const savedUser = await newUser.save()
        return res.status(201).json({
            status: true,
            message: "user succesfully created",
            data: savedUser
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: false,
            message: "user cannot be created"
        })
    }
});

router.post("/api/login",async(req,res)=>{
    try{
        const {email,password} = req.body
       if(!email ){
        return res.status(401).json({
            status: false,
            message: "Please provide email"
        })
       }
       const user = await User.findOne({email})
       if(!user){
        return res.status(401).json({
            status: false,
            message: "User not found, Please register on this app"
        })
       }
       const isPasswordCorrect = await user.isPasswordCorrect(password)
       if(!isPasswordCorrect){
        return res.status(401).json({
            status: false,
            message: "Incorrect password"
        })
       }
       //GENEARING ACCESS AND REFRESH TOKEN
       const accessToken=await user.generateAccessToken()
       const refreshToken=await user.generateRefreshToken()

       //SAVING THE REFRESH TOKEN IN THE DATABASE
       user.refreshToken = refreshToken

       //SAVING THE USER
       await user.save({validateBeforeSave:false})

       //GETTING NECCASARY INFORMATION FROM THE USER
       const loggedInUser=await User.findById(user.id).select("-password -refreshToken -__v -updatedAt")

       //OPTIONS FOR COOKIES
       const options ={
        httpOnly: true,
        secure:true
       }

       //COOKIES SECTION
       return res.
       status(200).
       cookie("accessToken",accessToken,options)
       .cookie("refreshToken",refreshToken,options).
       json({
        status: true,
        message: "User logged in successfully",
        data:loggedInUser,
        accessToken:accessToken,
        refreshToken: refreshToken
       })
       
    }catch(error){
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
 
})