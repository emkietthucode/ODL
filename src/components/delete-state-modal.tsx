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
        title={`Xóa tiểu bang: ${khuVuc.ten_khu_vuc}`}
        description=""
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="flex justify-center items-center gap-5">
          <Button
            onClick={() => onClose()}
            variant="secondary"
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDelete(khuVuc.id)}
            variant="destructive"
            disabled={isLoading}
          >
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteStateModal
