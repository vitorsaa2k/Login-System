import { useEffect, useState } from "react"
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser"
import {IoIosArrowDown} from 'react-icons/io'
import { Button } from "../Button"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { createPortal } from "react-dom"
import { Modal } from "../Modal"


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
      className="p-2 rounded bg-slate-300 flex items-center hover:cursor-pointer"
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
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  function logOut() {
    localStorage.clear()
    navigate('/')
  }
  useEffect(() => {
      setIsOpen(true)
  }, [])

  function showModal() {
    setIsDeleting(true)
  }

  async function deleteAccount() {
    await axios.delete(`http://localhost:3000/profile/${getUser.user.name.length ? getUser.user.name : ''}`)
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className={`${isOpen ? 'absolute rounded right-0 top-3 mt-10 mr-7 p-2 bg-white transition opacity-100 duration-300 ease-in-out' : 'transition opacity-0 duration-300 ease-in-out absolute rounded right-0 top-3 mt-10 mr-7 p-2 bg-white'}`}>
      <div className="flex items-center gap-2">
        
        {
        isDeleting ? (
          createPortal(
          <Modal
            deleteAccount={deleteAccount}
            close={() => setIsDeleting(false)}
          >
            ARE YOU SURE YOU WANT TO DELETE THE ACCOUNT?
          </Modal>,
          document.getElementById('pop-ups')!)
          ) : null
        }
      <Button onClick={logOut}>LogOut</Button>
      <Button isRed onClick={showModal}>Delete</Button>
      </div>
    </div>
  )
}