import { useEffect, useState } from "react"

interface UserResponse {
  user: {
  description: string;
  email: string;
  name: string;
  password: string;
  __v: number;
  _id: string;
}
}

export function useSaveCurrentUser({user}: UserResponse) {
  const [userObj, setUserObj] = useState({})
  const res = user
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(res))
    const user = localStorage.getItem('user')
    const obj = JSON.parse(user || '{}')
    setUserObj(obj)
  })
}