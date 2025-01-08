'use client'

import { LoginFormType } from '@/types/schemas/login'
import LoginForm from './LoginForm'
import Link from 'next/link'

import { login } from '../actions'
import Image from 'next/image'
import LoginImage from '../../../../public/images/Login.png'
import { useState } from 'react'

function Login() {
  const [isLoading, setIsloading] = useState(false)

  const handleSubmit = async (values: LoginFormType) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    setIsloading(true)
    try {
      await login(formData)
    } catch (error) {
      console.log(error)
    }
    setIsloading(false)
  }

  return (
    <div className="bg-[#F6F4FD] h-screen flex items-center justify-center">
      <div className="flex max-w-3xl h-[560px] shadow-[10px_10px_20px_0px_rgba(0, 0, 0, 0.25)]">
        <Image
          src={LoginImage}
          alt="Login image"
          className="w-[380px] h-full object-cover object-right"
        />
        {/* <div className="w-[380px] h-full bg-blue-500"></div> */}
        <div className="w-[480px] h-full bg-white px-12 py-8">
          <h5 className="font-bold text-2xl mt-6">Account Login</h5>
          <p className="text-[#8692A6] my-3">
            If you are already a member you can login with your email address
            and password.
          </p>

          <div className="bg-[#F5F5F5] w-full h-[1px] my-3"></div>

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

          <p className="text-sm w-full text-center my-6">
            Don't have an account?{' '}
            <Link href="/" className="text-purple hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
