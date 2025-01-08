import { z } from 'zod'

export enum Genders {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export const SignUpFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(6, { message: 'Name must be at least 6 characters' }),
  gender: z.nativeEnum(Genders),
})

export type SignUpFormType = z.infer<typeof SignUpFormSchema>
