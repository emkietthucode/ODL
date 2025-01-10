'use client'

import useDeleteStateModal from '@/hooks/useDeleteStateModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const DeleteStateModal = () => {
  const {
    isOpen,
    onClose,
    item: khuVuc,
    triggerRefresh,
  } = useDeleteStateModal()
  const [isLoading, setIsLoading] = useState(false)

  if (!khuVuc) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('quoc_ky')
        .remove([`quoc-ky-${id}`])

      if (storageError) {
        return toast.error('Xóa tiểu bang không thành công.')
      }

      const { data, error } = await supabase.rpc('delete_tieu_bang', {
        p_id: id,
      })

      if (error) {
        return toast.error('Xóa tiểu bang không thành công.')
      }
      toast.success('Xóa tiểu bang thành công.')
      triggerRefresh()
      onClose()
    } catch (error) {
      toast.error('Xóa không thành công.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <Modal
        title={`XÓA TIỂU BANG`}
        description="Bạn chắc chắn xóa tiểu bang này?"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => handleDelete(khuVuc.id)}
          >
            XÁC NHẬN
          </Button>
          <Button
            className="bg-neutral-400 hover:bg-neutral-300 text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => onClose()}
          >
            HỦY
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteStateModal
