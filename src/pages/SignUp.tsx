import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { InputVer } from '../components/InputVer'
import { Text } from '../components/Text'
import { Title } from '../components/Title'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'




export function SignUp() {
  const navigate = useNavigate()
  const getUser = useGetCurrentUser()

  if(getUser.user.name.length > 4) {
    navigate(`/profile/${getUser.user.name}`)
  }

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  })
  const [isValid, setIsValid] = useState(false)
  console.log(form)

  function handleSubmit(event :React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    axios.post('http://localhost:3000/signup', {
      email: form.email,
      name: form.name,
      password: form.password
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      console.log(res)
      navigate(`/profile/${form.name}`)
    }).catch(err => console.log(err))
  }

  function handleFormChange(event: React.FormEvent<HTMLInputElement>) {
    const {name, value} = event.currentTarget
    setForm((prevForm) => (
      {
      ...prevForm,
      [name] : value
      }))
  }

  function setIsValidFalse() {
    setIsValid(false)
  }
  function setIsValidTrue() {
    setIsValid(true)
  }

  console.log(isValid)

  return (
    <div className='bg-my-blue-500 w-screen h-screen flex justify-center items-center'>
      <div className='w-[539px] h-[741px] bg-white rounded-[40px]'>
        <div className='flex flex-col px-11 gap-4'>
          <div className='flex items-center pt-12 justify-between'>
            <div className='flex flex-col'>
              <Title size='sm'>Welcome</Title>
              <Title size='lg'>Sign up</Title>
            </div>
            <div className='flex flex-col'>
              <Text size='sm' className='text-my-gray-300'>Have account?</Text>
              <Text asChild size='sm' className='text-my-blue-500 hover:cursor-pointer'>
                <Link to='/signin'>Sign in</Link>
              </Text>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className='flex flex-col gap-3 mb-10'>
              <Text>Enter your username</Text>

              <Input
                name='name'
                placeholder='Username' 
                type={'text'}
                value={form.name}
                onChange={(e) => handleFormChange(e)}
              />
              {/* {form.name && <InputVer setFalse={setIsValidFalse} setTrue={setIsValidTrue} input={form.name} type='name' />} */}

            </label>
            <label className='flex flex-col gap-3 mb-10'>
              <Text>Enter your email address</Text>

              <Input
                name='email'
                placeholder='Email address' 
                type={'email'}
                value={form.email}
                onChange={(e) => handleFormChange(e)}
              />
              {form.email && <InputVer setFalse={setIsValidFalse} setTrue={setIsValidTrue} input={form.email} type='email' />}

            </label>
            <div className='flex flex-col mb-12'>
              <label className='flex flex-col gap-3 mb-14'>
                <Text>Enter your password</Text>

                <Input
                  name='password'
                  placeholder='Password' 
                  type={'password'} 
                  value={form.password}
                  onChange={(e) => handleFormChange(e)}
                />
                {form.password && <InputVer setFalse={setIsValidFalse} setTrue={setIsValidTrue} input={form.password} type='password' />}

              </label>
            </div>
            <Button disabled={!isValid}>Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

