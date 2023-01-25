import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { FacebookLogo } from '../components/FacebookLogo'
import { GoogleLogo } from '../components/GoogleLogo'
import { Input } from '../components/Input'
import { FAILED } from '../components/pop_ups/FAILED'
import { Text } from '../components/Text'
import { Title } from '../components/Title'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputVer } from '../components/InputVer'


export function SignIn() {
  const navigate = useNavigate()
  const getUser = useGetCurrentUser()

  if(getUser.message !== 'User not found' && '') {
    navigate(`/profile/${getUser.user.name}`)
  }

  const UserSchema = z.object({
    email: z.string().email({
      message: 'Invalid type of email'
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

  const [response, setResponse] = useState<AxiosResponse<any, any>>()

  async function submitApi(data: FieldValues) {
    await axios.post('http://localhost:3000/signin', {
      email: data.email,
      password: data.password
    }).then(res => {
      setResponse(res)
      if(res.data.status == 'SUCCESS') {
        localStorage.setItem('user', JSON.stringify(res.data))
        navigate(`/profile/${res.data.user.name}`)
      }
    }
      ).catch(err => console.log(err))
  }

  if(response != undefined) {
    setTimeout(() => {
      setResponse(undefined)
    }, 3000)
  }

  return (
    <div className='bg-my-blue-500 w-screen h-screen flex justify-center items-center'>
      <div className='p-3 bg-white rounded-[40px]'>
        <div className='flex flex-col px-11 gap-4'>
          <div className='flex items-center pt-12 justify-between'>
            <div className='flex flex-col'>
              <Title size='sm'>Welcome</Title>
              <Title size='lg'>Sign in</Title>
            </div>
            <div className='flex flex-col'>
              <Text size='sm' className='text-my-gray-300'>No account?</Text>
              <Text asChild size='sm' className='text-my-blue-500 hover:cursor-pointer'>
                <Link to='/signup'>Sign up</Link>
              </Text>
            </div>
          </div>
          <div className='sm:gap-2 flex justify-between py-8'>
            <button className='bg-[#E9F1FF] py-2 px-9 flex justify-start items-center gap-5 rounded-[9px]'>
              <GoogleLogo />
              <Text size='md' className='hidden sm:block font-normal text-my-blue-500'>Google</Text>
            </button>
            <button className='bg-[#E9F1FF] py-2 px-9 flex justify-start items-center gap-5 rounded-[9px]'>
              <FacebookLogo />
              <Text size='md' className='hidden sm:block font-normal text-my-blue-500'>Facebook</Text>
            </button>
          </div>
          <form onSubmit={handleSubmit(submitApi)}>
            <label className='flex flex-col gap-3 mb-10'>
              <Text>Enter your email address</Text>
              <Input
                register={register}
                name='email'
                placeholder='Enter your email' 
                type={'email'}
              />
            {errors.email && <InputVer input={`${errors.email?.message}`} type='email' />}
            </label>
            <div className='flex flex-col mb-12'>
              <label className='flex flex-col gap-3 mb-3'>
                <Text>Enter your password</Text>
                <Input
                  register={register}
                  name='password'
                  placeholder='Password' 
                  type={'password'}
                />
              {errors.password && <InputVer input={`${errors.password?.message}`} type='password' />}
              </label>
              <Text asChild className='text-my-blue-500 hover:cursor-pointer self-end' size='sm'><a>Forgot password</a></Text>
            </div>
            <div className='mb-5'>
              <Button isSubmitting={isSubmitting} disabled={isSubmitting || !isValid}>Sign in</Button>
            </div>
          </form>
        </div>
      </div>
      {response?.data?.status === "FAILED" && <FAILED response={response?.data?.message} />}
    </div>
  )
}

