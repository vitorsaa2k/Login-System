import { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { UserProfile } from "./UserProfile";


export function Nav() {
  return (
    <nav className='bg-white absolute top-0 w-screen '>
      <div className="flex justify-between items-center">
      <Link to={'/'}>Home</Link>
      <UserProfile />
      </div>
    </nav>
  )
}