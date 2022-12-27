import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Nav } from "../components/nav/Nav";
import { Title } from "../components/Title";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";





export function Home() {
  const navigate = useNavigate()
  const getUser = useGetCurrentUser()
  console.log(getUser)

    if(getUser.user.name.length >= 2) {
      navigate(`/profile/${getUser.user.name}`)
      return null
    } else {
      return (
        <div className="bg-my-blue-500 flex flex-col w-screen h-screen justify-center items-center">
          <div className="bg-white p-8 flex flex-col gap-2 text-center rounded-lg">
            <Title size="lg" className="mb-5">New Here?</Title>
            <div className="flex flex-col gap-2">
              <Button onClick={()=> navigate('/signup')}>Create Account</Button>
              <Button onClick={()=> navigate('/signin')}>I have an account</Button>
            </div>
          </div>
        </div>
      )
      
    }
}