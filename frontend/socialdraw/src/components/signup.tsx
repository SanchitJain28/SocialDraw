import axios from "axios";
import { h2, normalInput, para, WarningButton } from "../Themeclasses";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
export default function SignUp() {
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const Axios = axios.create({
        baseURL: 'http://localhost:3000'
    });

    
    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    const file = watch("files");

    useEffect(() => {
        if (file && file[0]) {
          setPreview(URL.createObjectURL(file[0]));
        }
      }, [file]);
   

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const { files, name, email, password, PhoneNo } = data
            const formData = new FormData();
            formData.append("file", files[0]); // "file" should match the field name in Multer
            formData.append("name", name); // "file" should match the field name in Multer
            formData.append("email", email); // "file" should match the field name in Multer
            formData.append("password", password); // "file" should match the field name in Multer
            formData.append("PhoneNo", PhoneNo); // "file" should match the field name in Multer
            const response = await Axios.post("/api/createuser", formData)
            console.log(response)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    };
    return (
        <div className="p-8">
            <p className={h2 + "mx-4 my-4"}>Welcome to the SignUp page</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center ">
                    <input
                        defaultValue=""
                        placeholder="name"
                        {...register("name")}
                        className={normalInput + "lg:w-1/2"} />
                    <input
                        defaultValue=""
                        placeholder="email"
                        {...register("email")}
                        className={normalInput + "lg:w-1/2"} />
                    <input
                        defaultValue=""
                        placeholder="password"
                        {...register("password")}
                        className={normalInput + "lg:w-1/2"} />
                    <input
                        defaultValue=""
                        placeholder="register"
                        {...register("PhoneNo")}
                        className={normalInput + "lg:w-1/2"} />
                    <input
                        type="file"
                        id="profile_pic"
                        className="hidden"
                        {...register("files")}
                        // onChange={handleFileChange}
                    />
                    <div className="flex flex-col lg:flex-row justify-between">
                        <label htmlFor="profile_pic" className={para + "bg-black p-4 rounded-xl mx-4"} >Choose a profile picture</label>
                        {preview && (
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="w-20 h-20 object-cover rounded-full border border-gray-300 m-4"
                            />
                        )}
                    </div>

                    {errors.exampleRequired && <span>This field is required</span>}
                    <input type="submit" disabled={loading} value={loading?"submitting":"submit"} className={WarningButton + "w-80"} />

                </div>

            </form>
        </div>
    )
}
