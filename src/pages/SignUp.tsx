import axios from 'axios'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
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

  const {register, handleSubmit} = useForm()

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  })
  const [isValid, setIsValid] = useState(false)
  console.log(form)

  function submitApi(data: FieldValues) {
    console.log(data)
    axios.post('http://localhost:3000/signup', {
      email: data.email,
      name: data.name,
      password: data.password
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
          <form onSubmit={handleSubmit(submitApi)}>
            <label className='flex flex-col gap-3 mb-10'>
              <Text>Enter your username</Text>

              <Input
                register={register}
                name='name'
                placeholder='Username' 
                type={'text'}
              />
              {/* {form.name && <InputVer setFalse={setIsValidFalse} setTrue={setIsValidTrue} input={form.name} type='name' />} */}

            </label>
            <label className='flex flex-col gap-3 mb-10'>
              <Text>Enter your email address</Text>

              <Input
                register={register}
                name='email'
                placeholder='Email address' 
                type={'email'}
              />
              {form.email && <InputVer setFalse={setIsValidFalse} setTrue={setIsValidTrue} input={form.email} type='email' />}

            </label>
            <div className='flex flex-col mb-12'>
              <label className='flex flex-col gap-3 mb-14'>
                <Text>Enter your password</Text>

                <Input
                  register={register}
                  name='password'
                  placeholder='Password' 
                  type={'password'} 
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

