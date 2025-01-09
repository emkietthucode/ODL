'use client'
import Modal from './Modal'
import Input from '@/components/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'
import useUpdateStateModal from '@/hooks/useUpdateStateModal'

const UpdateStateModal = () => {
  const {
    isOpen,
    onClose,
    item: khuVuc,
    triggerRefresh,
  } = useUpdateStateModal()
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
      stateName: '',
      //language: '',
      symbol: null,
    },
  })

  useEffect(() => {
    if (khuVuc) {
      reset({
        stateName: khuVuc.ten_khu_vuc || '',
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

      const flagFile = values.symbol?.[0]

      if (!values.stateName) {
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
          return toast.error('Lỗi khi thêm quốc kỳ.')
        }
      }

      const { data, error } = await supabase.rpc('update_tieu_bang', {
        p_id: khuVuc.id,
        p_ten_khu_vuc: values.stateName,
        p_ngon_ngu: '',
        p_quoc_ky: `quoc-ky-${khuVuc.id}`,
      })

      if (error) {
        return toast.error('Cập nhật tiểu bang không thành công.')
      }

      setIsLoading(false)
      toast.success('Cập nhật tiểu bang thành công.')
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
      title="Cập nhật tiểu bang"
      description="Điền thông tin tiểu bang mới"
      isOpen={isOpen}
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
            error={!!errors.flag}
            accept="image/*"
            {...register('symbol', { required: false })}
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

export default UpdateStateModal
