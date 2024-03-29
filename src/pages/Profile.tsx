import axios, { AxiosResponse } from "axios"
import { ReactNode, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Nav } from "../components/nav/Nav"
import { FAILED } from "../components/pop_ups/FAILED"
import { SUCCESS } from "../components/pop_ups/SUCCESS"
import { Text } from "../components/Text"
import { Title } from "../components/Title"
import { FieldValues, useForm } from 'react-hook-form'
import { useGetCurrentUser } from "../hooks/useGetCurrentUser"

interface User {
  email: string,
  name: string,
  password: string,
  description: string | FieldValues | ReactNode
}

export function Profile() {
  const [isChanging, setIsChanging] = useState(false)
  const [image, setImage] = useState<string | Blob>('')
  const [response, setResponse] = useState<AxiosResponse<any, any>>()
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const getUser = useGetCurrentUser()
  const {user} = useParams()

  /* if(getUser.user.name !== user) {
    navigate(`/`)
    localStorage.clear()
  } */

  const [userState, setUserState] = useState<User>({
    email: '',
    name: '',
    password: '',
    description: '',
  })

  
  useEffect(() => {
    axios.get(`http://localhost:3000/profile/${user}`).then((response) => {
      setUserState(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data))
      setResponse(response)
    })
  }, [])

  function submitApi(data: FieldValues) {
    axios.put(`http://localhost:3000/profile/${user}`, data).then((res) => {
      setResponse(res)
      if(res.data.status === "SUCCESS") {
        setUserState(prevState => ({...prevState, description: data.description}))
      }
      localStorage.setItem('user', JSON.stringify(res.data))
    }).catch(error => console.log(error))
    setIsChanging(false)
  }


  if(response != undefined) {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000)
  }



  return (
    <div className='bg-my-blue-500 flex w-screen h-screen justify-center items-center'>
        <Nav />
        <div className='max-w-7xl max-h-fit p-6 bg-white rounded-[40px]'>
          <header>{`Welcome, ${user}`}</header>
          <section className="flex flex-col gap-4">
            <img src=''/>
            <div>
              <Title>Email:</Title>
              <Text> {userState ? userState.email : ''}</Text>
            </div>
            {
              isChanging ? (
                <form className="flex items-center" onSubmit={handleSubmit(submitApi)}>
                  <Title>Description:</Title>
                  <label className="flex m-1 gap-2 items-center">
                    <Input 
                      name="description"
                      placeholder="Change your description"
                      type={'text'} 
                      register={register}
                      />
                      <div className="flex gap-1">
                        <Button type="submit">Save</Button>
                        <Button type="button" isRed onClick={() => setIsChanging(false)}>Cancel</Button>
                      </div>
                  </label>
                </form>
              ) : (
                <div className="">
                  <Title>Description: </Title>
                  <button onClick={() => setIsChanging(true)} className="text-black hover:text-my-blue-500 hover:underline">{typeof userState?.description === 'string' ? userState.description : ''}</button>
                </div>
              )
            }
          </section>
          {response?.data.status === "SUCCESS" && <SUCCESS response={response?.data.message} />}
          {response?.data.status === "FAILED" && <FAILED response={response?.data.message} />}
        </div>
    </div>
  )
}