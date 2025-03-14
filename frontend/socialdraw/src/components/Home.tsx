import { primaryButton } from '../Themeclasses'
import { NavLink } from "react-router";
export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center">
      <p className='text-xl font-bold text-black font-sans'>Welcome to Social Draw, draw with your friends</p>
      <NavLink to="/uploadFile" className={primaryButton} >Go to file upload</NavLink>
     </div>
  )
}

  