'use client'

//import uniqid from "uniqid";
import useInsertCountryModal from '../hooks/useInsertCountryModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
//import { useUser } from "@/hooks/useUser";
//import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from 'next/navigation'

const InsertCountryModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const insertCountryModal = useInsertCountryModal()
  //const {user} = useUser();
  //const supabaseClient = useSupabaseClient();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      countryName: '',
      language: '',
      flag: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      insertCountryModal.onClose()
    }
  }
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)
      console.log(values)

      const flagFile = values.flag?.[1]

      if (!values.countryName || !values.language || !flagFile) {
        console.log('Error')
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }
      //const uniqueID = uniqid();

      // const {
      //     data: songData,
      //     error: songError
      // } = await supabaseClient
      //     .storage
      //     .from('songs')
      //     .upload(`song-${values.title}-${uniqueID}`,songFile,{
      //         cacheControl:'3600',
      //         upsert: false
      //     })
      // if (songError){
      //     setIsLoading(false);
      //     return toast.error("Failed song upload.")
      // }

      // const {
      //     data: imageData,
      //     error: imageError
      // } = await supabaseClient
      //     .storage
      //     .from('images')
      //     .upload(`image-${values.title}-${uniqueID}`,imageFile ,{
      //         cacheControl:'3600',
      //         upsert: false
      //     })
      // if (imageError){
      //     setIsLoading(false);
      //     return toast.error("Failed image upload.")
      // }

      // const {
      //     error: supabaseError
      // } = await supabaseClient
      //     .from('songs')
      //     .insert({
      //         user_id: user.id,
      //         title: values.title,
      //         author: values.author,
      //         image_path: imageData.path,
      //         song_path: songData.path
      //     })
      // if (supabaseError){
      //     setIsLoading(false);
      //     return toast.error(supabaseError.message)
      // }

      router.refresh()
      setIsLoading(false)
      toast.success('Thêm quốc gia mới thành công.')
      reset()
      insertCountryModal.onClose()
    } catch (error) {
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Thêm quốc gia mới"
      description="Điền thông tin quốc gia mới"
      isOpen={insertCountryModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="countryName"
          disabled={isLoading}
          error={!!errors.countryName}
          {...register('countryName', { required: true })}
          placeholder="Tên quốc gia"
        />
        <Input
          id="language"
          disabled={isLoading}
          error={!!errors.language}
          {...register('language', { required: true })}
          placeholder="Ngôn ngữ"
        />
        <div>
          <div className="pb-1">Chọn quốc kỳ</div>
          <Input
            id="flag"
            type="file"
            disabled={isLoading}
            error={!!errors.flag}
            accept="image/*"
            {...register('flag', { required: true })}
          />
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          disabled={isLoading}
          type="submit"
        >
          Thêm
        </Button>
      </form>
    </Modal>
  )
}

export default InsertCountryModal
