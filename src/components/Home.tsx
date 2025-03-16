import axios from 'axios';
import { h2, h3, primaryButton } from '../Themeclasses'
import { NavLink } from "react-router";
import { useEffect, useState } from 'react';

export interface User {
  _id: string
  name: string
  email: string
  password: string
  profilePic: string
  PhoneNo: string
  createdAt: Date
}
export default function LandingPage() {
  const Axios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  });
  const [user, setUser] = useState<null | User>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const refreshAccessToken = async () => {
    try {
      const response = await Axios.get("/api/refreshaccesstoken")
      console.log(response)
      console.log("token refreshed")
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = async () => {
    setLoading(true)
    try {
      const response = await Axios.get("/api/getuser")
      setUser(response.data.data)
    } catch (error) {
      console.log(error)
      try {
        await refreshAccessToken()
        const response = await Axios.get("/api/getuser")
        setUser(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  if (loading) {
    return <div className="m-4">
      <p className={h2 + "text-center"}>Loading...</p>
    </div>
  }
  return (
    <div className="flex flex-col justify-center">
      <p className={h2 + " mx-4 my-4"}>Welcome to Social Draw, draw with your friends</p>
      <p className={h3 + " mx-4 my-4"}>Welcome {user ? user.name : "Please log in "}</p>
      <div className="flex">
        <NavLink to="/uploadFile" className={primaryButton} >Go to file upload</NavLink>
        <NavLink to="/login" className={primaryButton} >Go to login</NavLink>
        <NavLink to="/signup" className={primaryButton} >Go to signup</NavLink>
      </div>

    </div>
  )
}

