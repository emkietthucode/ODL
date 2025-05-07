import { z } from 'zod'

export const createLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({ message: t('invalidEmail') }),
    password: z.string().min(1, { message: t('passwordRequired') }),
  })

export type LoginFormType = z.infer<ReturnType<typeof createLoginFormSchema>>
