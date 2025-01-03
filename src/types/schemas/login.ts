import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
})

export type LoginFormType = z.infer<typeof LoginFormSchema>
