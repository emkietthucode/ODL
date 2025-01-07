'use client'

import { v4 as uuidv4 } from 'uuid'
import useInsertCountryModal from '../hooks/useInsertCountryModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'
import { useRouter } from 'next/navigation'

const InsertCountryModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const insertCountryModal = useInsertCountryModal()
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

      const flagFile = values.flag?.[0]

      if (!values.countryName || !values.language || !flagFile) {
        console.log('Error')
        return toast.error('Vui lòng điền đầy đủ thông tin.')
      }
      const uniqueID = uuidv4()

      const { data: imageData, error: imageError } = await supabase.storage
        .from('quoc_ky')
        .upload(`quoc-ky-${uniqueID}`, flagFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (imageError) {
        setIsLoading(false)
        console.log(imageError)
        return toast.error('Lỗi khi thêm quốc kỳ.')
      }

      const { data, error } = await supabase.rpc('insert_khu_vuc', {
        p_id: uniqueID,
        p_ten_khu_vuc: values.countryName,
        p_ngon_ngu: values.language,
        p_quoc_ky: imageData.path,
      })

      if (error) {
        return toast.error('Thêm quốc gia không thành công.')
      }

      setIsLoading(false)
      toast.success('Thêm quốc gia mới thành công.')
      insertCountryModal.triggerRefresh()
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
