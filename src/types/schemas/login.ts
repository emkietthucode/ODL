import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
})

export type LoginFormType = z.infer<typeof LoginFormSchema>
