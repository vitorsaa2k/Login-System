import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <div className="">
              <Link className="m-2 flex justify-center text-my-sm px-4 py-3 font-medium text-white shadow-[0px 4px 19px rgba(119, 147, 65, 0.3)] w-full rounded-[10px] bg-my-blue-500" to={'/signup'}>Create Account</Link>
              <Link className="m-2 flex justify-center text-my-sm px-4 py-3 font-medium text-white shadow-[0px 4px 19px rgba(119, 147, 65, 0.3)] w-full rounded-[10px] bg-my-blue-500" to={'/signin'}>I have an account</Link>
            </div>
          </div>
        </div>
      )
      
    }
}