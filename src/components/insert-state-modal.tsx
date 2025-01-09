'use client'

import { v4 as uuidv4 } from 'uuid'
import useInsertStateModal from '../hooks/useInsertStateModal'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const InsertStateModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const insertStateModal = useInsertStateModal()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      stateName: '',
      //language: '',
      symbol: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      insertStateModal.onClose()
    }
  }
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)
      console.log(values)

      const flagFile = values.symbol?.[0]

      if (!values.stateName || !flagFile) {
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

      const { data, error } = await supabase.rpc('insert_tieu_bang', {
        p_id: uniqueID,
        p_ten_khu_vuc: values.stateName,
        p_ngon_ngu: '',
        p_quoc_ky: imageData.path,
      })

      if (error) {
        return toast.error('Thêm tiểu bang không thành công.')
      }

      setIsLoading(false)
      toast.success('Thêm tiểu bang mới thành công.')
      insertStateModal.triggerRefresh()
      reset()
      insertStateModal.onClose()
    } catch (error) {
      toast.error('Thêm mới không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Thêm tiểu bang"
      description="Điền thông tin tiểu bang mới"
      isOpen={insertStateModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="stateName"
          disabled={isLoading}
          error={!!errors.stateName}
          {...register('stateName', { required: true })}
          placeholder="Tên tiểu bang"
        />
        {/* <Input
        id="language"
        disabled={isLoading}
        error={!!errors.language}
        {...register('language', { required: true })}
        placeholder="Ngôn ngữ"
      /> */}
        <div>
          <div className="pb-1">Chọn biểu tượng</div>
          <Input
            id="symbol"
            type="file"
            disabled={isLoading}
            error={!!errors.symbol}
            accept="image/*"
            {...register('symbol', { required: false })}
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

export default InsertStateModal
