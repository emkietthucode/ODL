'use client'
import useAuth from '@/hooks/useAuth'
import ProfileForm, { ProfileFormType } from './ProfileForm'
import supabase from '@/utils/supabase/supabase'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function Profile() {
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState(null)
  const [regions, setRegions] = useState([])
  const [states, setStates] = useState([])

  const handleSubmit = (values: ProfileFormType) => {
    console.log(values)
  }

  const getUserDetails = async () => {
    if (!user) {
      return
    }

    const { data, error } = await supabase.rpc('get_nguoi_dung_by_id', {
      user_id: user?.id,
    })

    if (error) {
      toast.error(error.message)
    } else {
      setUserDetails(data?.user_record)
    }
  }

  const getRegion = async () => {
    const { data, error } = await supabase.rpc('search_khu_vuc_proc', {
      search_text: '',
    })

    if (error) {
      toast.error('Error fetching regions')
    }

    setRegions(data)
  }

  const getStates = async () => {
    const { data, error } = await supabase.rpc('search_tieu_bang', {
      search_text: '',
    })
    if (error) {
      toast.error('Error fetching states')
    }
    setStates(data)
  }

  useEffect(() => {
    getUserDetails()
    getRegion()
    getStates()
  }, [user])
  return (
    <div className="rounded-xl h-[800px] w-[1200px] mx-auto my-[68px] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.25)] bg-[#F0F8FF]">
      <div className="h-[100px] bg-[#B49BE3] rounded-t-inherit"></div>
      <div className="p-8">
        {userDetails && (
          <ProfileForm
            onSubmit={handleSubmit}
            user={userDetails}
            regions={regions}
            states={states}
          />
        )}
      </div>
    </div>
  )
}

export default Profile
