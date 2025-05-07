'use client'

import { LoginFormType } from '@/types/schemas/login'
import LoginForm from './LoginForm'
import Link from 'next/link'

import { login } from '../actions'
import Image from 'next/image'
import LoginImage from '../../../../public/images/Login.png'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'
import { useTranslations } from 'next-intl'

function Login() {
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const router = useRouter()
  const t = useTranslations('LoginPage')

  const handleSubmit = async (values: LoginFormType) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    setIsloading(true)

    try {
      const res = await login(formData)

      if (res) {
        setUser(res.user)
      }

      router.push('/')
    } catch (error: AuthError | any) {
      if (error.message === 'Invalid login credentials') {
        setError('Wrong email or password')
      } else {
        setError('An error occurred! Please try again')
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className="bg-[#F6F4FD] h-screen flex items-center justify-center">
      <div className="flex max-w-3xl h-[580px] shadow-[10px_10px_20px_0px_rgba(0, 0, 0, 0.25)] mx-auto">
        <Image
          src={LoginImage}
          alt="Login image"
          className="w-[380px] h-full object-cover object-right"
        />
        {/* <div className="w-[380px] h-full bg-blue-500"></div> */}
        <div className="w-[480px] h-full bg-white px-12 py-8">
          <h5 className="font-bold text-2xl mt-6">{t('login')}</h5>
          <p className="text-[#8692A6] my-3 text-sm">{t('title')}</p>

          <div className="bg-[#F5F5F5] w-full h-[1px] my-3"></div>

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

          <p className="text-sm w-full text-center my-6">
            {t('noAccount')}{' '}
            <Link href="/auth/signup" className="text-purple hover:underline">
              {t('registerButton')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
