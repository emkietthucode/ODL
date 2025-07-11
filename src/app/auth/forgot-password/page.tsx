'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import supabase from '@/utils/supabase/supabase'
import Link from 'next/link'
import { useState } from 'react'

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [otp, setOtp] = useState<string>('')

  const handleSubmit = async () => {
    console.log('into')
    if (email.trim() === '') {
      return
    }

    const { data, error } = await supabase.rpc('check_reset_email', {
      p_email: email,
    })

    if (error || !data) {
      setError('Invalid email address/Login type')
      return
    }

    const { data: resetData, error: resetError } =
      await supabase.auth.resetPasswordForEmail(email)

    if (resetError) {
      setError('Failed to send reset instructions. Please try again later.')
    }

    console.log('Reset instructions sent:', resetData)
  }

  const handleSubmitOtp = async () => {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'recovery',
    })

    console.log('OTP verification data:', data)
  }

  return (
    <div className="w-[400px] mt-20 mx-auto shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] p-8 rounded-[12px]">
      <p className="text-2xl font-extrabold">Forgot your password?</p>
      <p className="text-sm mt-3">
        Enter the email associated with your account and we'll send you password
        reset instructions.
      </p>
      <Label htmlFor="email" className="mt-8 block">
        Email
      </Label>
      <Input
        id="email"
        type="text"
        value={email}
        className="w-full px-2 py-2 my-2 h-12"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label htmlFor="email" className="mt-8 block">
        OTP
      </Label>
      <Input
        id="email"
        type="text"
        value={otp}
        className="w-full px-2 py-2 my-2 h-12"
        placeholder="Enter your email"
        onChange={(e) => setOtp(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={() => handleSubmit()}
        type="button"
        className="w-full h-12 bg-[#A08CE6] text-white rounded-[10px] mt-4 hover:bg-purple"
      >
        Send Reset Instructions
      </button>

      <button
        onClick={() => handleSubmitOtp()}
        type="button"
        className="w-full h-12 bg-[#A08CE6] text-white rounded-[10px] mt-4 hover:bg-purple"
      >
        submit
      </button>

      <p className="text-sm text-purple mt-4 ">
        Return to{' '}
        <Link href="/auth/login" className="hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default ForgotPasswordPage
