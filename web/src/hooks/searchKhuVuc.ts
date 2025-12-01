'use server'
import supabase from '@/utils/supabase/supabase'

const searchKhuVuc = async (searchText: string) => {
  const { data, error } = await supabase.rpc('search_khu_vuc_proc', {
    search_text: '',
  })

  return {
    error: error?.message,
    data,
  }
}

export default searchKhuVuc
