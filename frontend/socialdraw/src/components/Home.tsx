import { h1, h2, primaryButton } from '../Themeclasses'
import { NavLink } from "react-router";
export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center">
      <p className={h2+" mx-4 my-4"}>Welcome to Social Draw, draw with your friends</p>
      <div className="flex">
        <NavLink to="/uploadFile" className={primaryButton} >Go to file upload</NavLink>
        <NavLink to="/login" className={primaryButton} >Go to login</NavLink>
        <NavLink to="/signup" className={primaryButton} >Go to signup</NavLink>
      </div>

    </div>
  )
}

