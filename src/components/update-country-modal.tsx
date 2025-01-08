'use client'

import useUpdateCountryModal from '@/hooks/useUpdateCountryModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const UpdateCountryModal = () => {
  const {
    isOpen,
    onClose,
    item: khuVuc,
    triggerRefresh,
  } = useUpdateCountryModal()
  const [isLoading, setIsLoading] = useState(false)
  //const {user} = useUser();
  //const supabaseClient = useSupabaseClient();
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

  useEffect(() => {
    if (khuVuc) {
      reset({
        countryName: khuVuc.ten_khu_vuc || '',
        language: khuVuc.ngon_ngu || '',
      })
    }
  }, [khuVuc, reset])

  if (!khuVuc) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      onClose()
    }
  }
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)
      console.log(values)

      const flagFile = values.flag?.[0]

      if (!values.countryName || !values.language) {
        console.log('Error')
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }

      if (flagFile) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('quoc_ky')
          .upload(`quoc-ky-${khuVuc.id}`, flagFile, {
            cacheControl: '3600',
            upsert: true,
          })

        if (imageError) {
          setIsLoading(false)
          console.log(imageError)
          return toast.error('Lỗi khi thêm quốc kỳ.')
        }
      }

      const { data, error } = await supabase.rpc('update_khu_vuc', {
        p_id: khuVuc.id,
        p_ten_khu_vuc: values.countryName,
        p_ngon_ngu: values.language,
        p_quoc_ky: `quoc-ky-${khuVuc.id}`,
      })

      if (error) {
        return toast.error('Cập nhật quốc gia không thành công.')
      }

      setIsLoading(false)
      toast.success('Cập nhật quốc gia mới thành công.')
      triggerRefresh()
      reset()
      onClose()
    } catch (error) {
      toast.error('Cập nhật không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Cập nhật quốc gia"
      description="Điền thông tin quốc gia mới"
      isOpen={isOpen}
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
            {...register('flag', { required: false })}
          />
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          disabled={isLoading}
          type="submit"
        >
          Cập nhật
        </Button>
      </form>
    </Modal>
  )
}

export default UpdateCountryModal
