import axios from 'axios'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { InputVer } from '../components/InputVer'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '../components/Text'
import { Title } from '../components/Title'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import { FAILED } from '../components/pop_ups/FAILED'

interface Response {
  code: ''
  config: {}
  message: "Network Error"
  name: "AxiosError"
  request: {}
}

export function SignUp() {
  const navigate = useNavigate()
  const getUser = useGetCurrentUser()
  
  if(getUser?.message !== 'User not found' && '') {
    navigate(`/profile/${getUser.user.name}`)
  }

  const [response, setResponse] = useState<Response | undefined>()

  const UserSchema = z.object({
    email: z.string().email({
      message: 'Invalid type of email'
    }),
    name: z.string().min(3, {
      message: 'Your name must have at least 3 characters'
    }),
    password: z.string().min(8, {
      message: 'Your password must have at least 8 characters'
    }),
  })

  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isSubmitting}
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema)
  })

  async function submitApi(data: FieldValues) {
    console.log(data)
    await axios.post('http://localhost:3000/signup', {
      email: data.email,
      name: data.name,
      password: data.password
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data))
      console.log(res)
      navigate(`/profile/${data.name}`)
    }).catch(err => {
      setResponse(err)
      console.log(err)
    })
  }

  if(response != undefined) {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000)
  }

  console.log(isValid)

  return (
    <div className='bg-my-blue-500 w-screen h-screen flex justify-center items-center'>
      <div className='p-3 bg-white rounded-[40px]'>
        <div className='flex flex-col px-11 gap-4'>
          <div className='flex items-center pt-12 justify-between'>
            <div className='flex gap-[65px] items-center mb-4'>
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
          </div>
          <form onSubmit={handleSubmit(submitApi)}>
            <label className='flex flex-col gap-3 mb-6'>
              <Text>Enter your username</Text>

              <Input
                register={register}
                name='name'
                placeholder='Username' 
                type={'text'}
              />
              {errors.name && <InputVer input={`${errors.name?.message}`} type='name' />}

            </label>
            <label className='flex flex-col gap-3 mb-6'>
              <Text>Enter your email address</Text>

              <Input
                register={register}
                name='email'
                placeholder='Email address' 
                type={'email'}
              />
              {errors.email && <InputVer input={`${errors.email?.message}`} type='email' />}

            </label>
            <div className='flex flex-col '>
              <label className='flex flex-col gap-3 mb-14'>
                <Text>Enter your password</Text>

                <Input
                  register={register}
                  name='password'
                  placeholder='Password' 
                  type={'password'} 
                />
                {errors.password && <InputVer input={`${errors.password?.message}`} type='password' />}

              </label>
            </div>
            <div className='mb-5'>
              <Button isSubmitting={isSubmitting} disabled={!isValid || isSubmitting}>Sign in</Button>
            </div>
          </form>
        </div>
      </div>
      {response?.message && <FAILED response={response?.message} />}
    </div>
  )
}

