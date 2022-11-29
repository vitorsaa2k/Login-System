import { useEffect, useState } from "react";



export function useGetCurrentUser() {
  const [user, setUser] = useState({
    status: '',
    user: {
      name: '',
      email: '',
      description: '',
      password: '',
      __v: 0,
      _id: ''
    }
  })
    useEffect(() => {
      const user = localStorage.getItem('user')
      const json = JSON.parse(user || '{}')
      if(JSON.stringify(json) === '{}') {
        setUser(prevUser => ({...prevUser}))
      } else {
        setUser(json)
      }
    }, [])
    return user
}