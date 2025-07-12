'use client'

import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import supabase from '@/utils/supabase/supabase'
import Link from 'next/link'
import { useState } from 'react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import Logo from '../../../../public/images/Logo.png'

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [otp, setOtp] = useState<string>('')

  const [step, setStep] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const t = useTranslations('ForgotPasswordPage')

  const handleSubmit = async () => {
    setLoading(true)
    if (email.trim() === '') {
      return
    }

    const { data, error } = await supabase.rpc('check_reset_email', {
      p_email: email,
    })

    if (error || !data) {
      setError(t('invalidEmail'))
      setLoading(false)
      return
    }

    const { data: resetData, error: resetError } =
      await supabase.auth.resetPasswordForEmail(email)

    if (resetError) {
      setError(t('emailSentFailed'))
      setLoading(false)
      return
    }

    setLoading(false)
    setError('')
    setStep(2)
  }

  const handleSubmitOtp = async () => {
    if (otp.trim() === '' || otp.length < 6) {
      setError(t('otpRequired'))
      return
    }
    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'recovery',
    })

    if (error || !data.user) {
      setError('otpInvalid')
      setLoading(false)
      return
    }

    setError('')
    setStep(3)
    setLoading(false)
  }

  const handleResetPassword = async () => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setError(t('passwordRequired'))
      return
    }

    if (password.length < 6) {
      setError(t('password6Chars'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'))
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setError(t('passwordResetFailed'))
      setLoading(false)
      return
    }

    setError('')
    setLoading(false)
    setStep(4)
  }

  return (
    <div className="w-[400px] mt-20 mx-auto shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] p-8 rounded-[12px]">
      <Link href="/" className="mb-6 flex items-center gap-3">
        <Image src={Logo} alt="logo" width={40} height={40} />

        <p className="text-xl font-extrabold text-purple">
          Online Driving License
        </p>
      </Link>

      {step === 1 && (
        <div>
          <p className="text-2xl font-extrabold">{t('step1')}</p>
          <p className="text-sm mt-3">{t('step1Description')}</p>
          <Label htmlFor="email" className="mt-8 block">
            Email
          </Label>
          <Input
            id="email"
            type="text"
            value={email}
            className="w-full px-2 py-2 my-2 h-12"
            placeholder={t('enterEmail')}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <Button
            disabled={loading || email.trim() === ''}
            onClick={() => handleSubmit()}
            type="button"
            className="w-full h-12 bg-[#A08CE6] text-white rounded-[10px] mt-4 hover:bg-purple"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {t('step1Submit')}
          </Button>

          <p className="text-sm text-purple mt-4 ">
            {t('return')}{' '}
            <Link href="/auth/login" className="hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-2xl font-extrabold">{t('step2')}</p>
          <p className="text-sm mt-3">{t('step2Description')}</p>

          <div className="my-4 flex justify-center">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            disabled={loading}
            onClick={() => handleSubmitOtp()}
            type="button"
            className="w-full h-12 bg-[#A08CE6] text-white rounded-[10px] mt-4 hover:bg-purple"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {t('step2Submit')}
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-2xl font-extrabold">{t('step3')}</p>
          <p className="text-sm mt-3">{t('step3Description')}</p>

          <Label htmlFor="password" className="mt-8 block">
            {t('newPassword')}
          </Label>
          <PasswordInput
            id="password"
            value={password}
            className="w-full px-2 py-2 my-2 h-12"
            placeholder={t('enterNewPassword')}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label htmlFor="confirm-password" className="mt-8 block">
            {t('confirmPassword')}
          </Label>
          <PasswordInput
            id="confirm-password"
            value={confirmPassword}
            className="w-full px-2 py-2 my-2 h-12"
            placeholder={t('confirmNewPassword')}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            disabled={loading}
            onClick={() => handleResetPassword()}
            type="button"
            className="w-full h-12 bg-[#A08CE6] text-white rounded-[10px] mt-4 hover:bg-purple"
          >
            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {t('step3Submit')}
          </Button>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-2xl font-extrabold"> {t('resetSuccessTitle')}</p>
          <p className="text-sm mt-3">
            {t('resetSuccess')}
            {' - '}
            <Link href="/auth/login" className="text-purple hover:underline">
              {t('login')}
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage
