import { Router } from "express";
import { User } from "../../Schemmas/userSchemma.js";
import UploadFileOnClodinary from "../../utils/clodinary.js";
import multer from "multer";
import { upload } from "../../middleware/multerMiddleware.js";
export const router = Router()

router.post("/api/createuser", upload.single('file'), async (req, res) => {
    try {
        const { path } = req.files
        const { name, email, password, PhoneNo } = req.body
        //CATCH IF user exists with an existing email
        const userExits = await User.findOne({
            email
        })
        if (userExits) {
            return res.status(405).json({
                status: false,
                message: "user Already exists"
            })
        }
        let profilePic = ""
        if(path){
            const {secure_url} = await UploadFileOnClodinary(path)
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

router.post("/api/FileUpload", upload.single('file'), async (req, res) => {
    const { path } = req.file
    const response = await UploadFileOnClodinary(path)
    return res.status(200).json({
        status: true,
        message: "file uploaded successfully",
        data: response
    })
})