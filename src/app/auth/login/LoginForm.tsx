'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import GoogleIcon from '../../../../public/icons/google-icon.svg'
import { signInWithGoogle } from '../actions'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { createLoginFormSchema, LoginFormType } from '@/types/schemas/login' // Adjust import path
import Link from 'next/link'

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void
  isLoading: boolean
}

function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const t = useTranslations('LoginPage')

  // Create the schema with the translation function
  const LoginFormSchema = createLoginFormSchema(t)

  const form = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  })

  const errors = form.formState.errors

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-[#696F79]">
                {t('email')}
              </FormLabel>
              {errors.email && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.email.message}
                </FormMessage>
              )}
              <FormControl>
                <Input id={field.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-[#696F79]">
                {t('password')}
              </FormLabel>
              {errors.password && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.password.message}
                </FormMessage>
              )}
              <FormControl>
                <PasswordInput id={field.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between my-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="data-[state=checked]:bg-purple"
            />
            <label htmlFor="remember" className="text-sm">
              {t('remember')}
            </label>
          </div>
          <Link href="/auth/forgot-password" className="px-0 hover:underline">
            {t('forgot')}
          </Link>
        </div>

        <Button
          variant="main"
          disabled={form.formState.isSubmitting || isLoading}
          className="w-full py-6 rounded-[20px] font-medium mb-3"
          type="submit"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {t('loginButton')}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting || isLoading}
          className="w-full py-6 rounded-[20px] border-black text-purple relative"
          onClick={signInWithGoogle}
        >
          <Image
            src={GoogleIcon}
            alt="Google icon"
            className="w-5 h-5 absolute left-4"
          />
          {isLoading && <Loader2 className="animate-spin" />}
          {t('googleButton')}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
