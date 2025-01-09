'use client'

import useDeleteCountryModal from '@/hooks/useDeleteCountryModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const DeleteCountryModal = () => {
  const {
    isOpen,
    onClose,
    item: khuVuc,
    triggerRefresh,
  } = useDeleteCountryModal()
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
        return toast.error('Xóa quốc gia không thành công.')
      }

      const { data, error } = await supabase.rpc('delete_khu_vuc', {
        p_id: id,
      })

      if (error) {
        return toast.error('Xóa quốc gia không thành công.')
      }
      toast.success('Xóa quốc gia thành công.')
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
        title={`Xóa quốc gia: ${khuVuc.ten_khu_vuc}`}
        description="Bạn có chắc chắn xóa quốc gia này không?"
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

export default DeleteCountryModal
