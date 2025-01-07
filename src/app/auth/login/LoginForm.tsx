'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { LoginFormSchema, LoginFormType } from '@/types/schemas/login'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { FaGoogle } from 'react-icons/fa'
import Image from 'next/image'

import GoogleIcon from '../../../../public/icons/google-icon.svg'
import { signInWithGoogle } from '../actions'

interface LoginFormProps {
  onSubmit: (data: LoginFormType) => void
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const form = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },

    resolver: zodResolver(LoginFormSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field}></PasswordInput>
              </FormControl>
            </FormItem>
          )}
        ></FormField>

        <div className="flex justify-between my-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="data-[state=checked]:bg-purple"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>

          <Button variant="link" className="px-0">
            Forgot password?
          </Button>
        </div>

        <Button
          variant="main"
          className="w-full py-6 rounded-[20px] font-medium mb-3"
          type="submit"
        >
          Log in
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full py-6 rounded-[20px] border-black text-purple relative"
          onClick={signInWithGoogle}
        >
          {/* <FaGoogle className="absolute left-4" /> */}
          <Image
            src={GoogleIcon}
            alt="Google icon"
            className="w-5 h-5 absolute left-4"
          />
          Sign in with Google
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
