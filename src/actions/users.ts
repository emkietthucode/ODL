'use server'
import { createClientWithServiceRoleKey } from '@/utils/supabase/server'

export const deleteAccount = async (id: string) => {
  const { auth } = await createClientWithServiceRoleKey()
  const { error } = await auth.admin.deleteUser(id)
  return error
}
