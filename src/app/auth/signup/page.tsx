'use client'

import Link from 'next/link'

import Image from 'next/image'
import LoginImage from '../../../../public/images/Login.png'
import { SignUpFormType } from '@/types/schemas/signup'
import SignUpForm from './SignUpForm'
import { signup } from '../actions'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'
import { useTranslations } from 'next-intl'

function Signup() {
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')
  const t = useTranslations('RegisterPage')

  const handleSubmit = async (values: SignUpFormType) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)
    formData.append('name', values.name)
    formData.append('gender', values.gender)

    setIsLoading(true)
    try {
      const res = await signup(formData)

      if (res) {
        setUser(res.user)
      }

      router.push('/')
    } catch (error: AuthError | any) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-[#F6F4FD] h-screen flex items-center justify-center">
      <div className="flex max-w-3xl h-[570px] shadow-[10px_10px_20px_0px_rgba(0, 0, 0, 0.25)]">
        <div className="w-[480px] h-full bg-white px-12 py-8">
          <h5 className="font-bold text-2xl mt-1">{t('register')}</h5>
          <p className="text-[#8692A6] my-3 text-sm">{t('title')}</p>

          <div className="bg-[#F5F5F5] w-full h-[1px] my-3"></div>

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <Image
          priority
          src={LoginImage}
          alt="Login image"
          className="w-[380px] h-full object-cover object-right"
        />
      </div>
    </div>
  )
}

export default Signup
