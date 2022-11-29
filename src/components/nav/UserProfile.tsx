import { useEffect, useState } from "react"
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser"
import {IoIosArrowDown} from 'react-icons/io'
import { Button } from "../Button"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export function UserProfile() {
  const getUser = useGetCurrentUser()
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useParams()
 

  function flipState() {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div>
      <div 
      className="p-2 bg-slate-300 flex items-center hover:cursor-pointer"
      onClick={flipState}
      >
        <div >{getUser.status == 'SUCCESS' ? getUser?.user?.name : user}</div>
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

  function deleteAccount() {
    axios.delete(`http://localhost:3000/profile/${getUser.user.name.length ? getUser.user.name : ''}`)
    navigate('/')
    localStorage.clear()
  }

  return (
    <div className="absolute right-0 top-3 m-7 p-2 bg-white">
      <div className="flex items-center">
      <Button onClick={logOut}>LogOut</Button>
      <Button isRed onClick={deleteAccount}>Delete</Button>
      </div>
    </div>
  )
}