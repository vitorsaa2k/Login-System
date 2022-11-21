import { useEffect, useState } from "react"
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser"
import {IoIosArrowDown} from 'react-icons/io'
import { Button } from "../Button"
import { Navigate, useNavigate } from "react-router-dom"


export function UserProfile() {
  const getUser = useGetCurrentUser()
  const [isOpen, setIsOpen] = useState(false)
 

  function flipState() {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div>
      <div 
      className="p-2 bg-slate-300 flex items-center hover:cursor-pointer"
      onClick={flipState}
      >
        <div >{getUser.user.name}</div>
        <div className={
          isOpen ? 'transition rotate-180 duration-300 ease-in-out' : 'transition rotate-0 duration-300 ease-in-out'
        }>
          <IoIosArrowDown />
        </div>
      </div>
        {
          isOpen ? (
            <DetailedUser />
          ) : (null)
        }
    </div>
  )
}

function DetailedUser() {
  const getUser = useGetCurrentUser()
  const navigate = useNavigate()

  function logOut() {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="absolute right-0 top-3 m-7 p-2 bg-white">
      <Button onClick={logOut}>Log Out</Button>
    </div>
  )
}