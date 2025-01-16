'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {
    error,
    data: { session },
  } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    throw error
  }

  // revalidatePath('/', 'layout')
  // redirect('/')

  return session
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('name') as string,
        email: formData.get('email') as string,
        gender: formData.get('gender') as string,
      },
    },
  }

  const {
    error,
    data: { session },
  } = await supabase.auth.signUp(data)

  if (error) {
    throw error
  }

  // revalidatePath('/', 'layout')
  // redirect('/')

  return session
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    redirect('/error')
  }

  redirect(data.url)
}

export async function signOut() {
  const supbase = await createClient()

  const { error } = await supbase.auth.signOut()
}
