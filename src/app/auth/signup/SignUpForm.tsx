'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'

import Image from 'next/image'

import { Loader2 } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Genders,
  SignUpFormSchema,
  SignUpFormType,
} from '@/types/schemas/signup'

interface SignUpFormProps {
  onSubmit: (data: SignUpFormType) => void
  isLoading: boolean
}

function SignUpForm({ onSubmit, isLoading }: SignUpFormProps) {
  const form = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      gender: Genders.Male,
    },

    resolver: zodResolver(SignUpFormSchema),
  })

  const errors = form.formState.errors

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-[#696F79]">
                Full name
              </FormLabel>
              {errors.name && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.name.message}
                </FormMessage>
              )}
              <Input id={field.name} {...field}></Input>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-[#696F79]">
                Email
              </FormLabel>
              {errors.email && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.email.message}
                </FormMessage>
              )}
              <Input id={field.name} {...field}></Input>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className="text-[#696F79]">
                Password
              </FormLabel>
              {errors.password && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.password.message}
                </FormMessage>
              )}
              <PasswordInput id={field.name} {...field}></PasswordInput>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#696F79]">Gender</FormLabel>
              {errors.gender && (
                <FormMessage className="text-red-500 mt-1">
                  {errors.gender.message}
                </FormMessage>
              )}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Genders.Male}>{Genders.Male}</SelectItem>
                  <SelectItem value={Genders.Female}>
                    {Genders.Female}
                  </SelectItem>
                  <SelectItem value={Genders.Other}>{Genders.Other}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting || isLoading}
          variant="main"
          className="w-full my-8"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
