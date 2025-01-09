'use client'

import useDeleteLicenceModal from '@/hooks/useDeleteLicenceModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const DeleteLicenceModal = () => {
  const {
    isOpen,
    onClose,
    item: hangBang,
    triggerRefresh,
  } = useDeleteLicenceModal()
  const [isLoading, setIsLoading] = useState(false)

  if (!hangBang) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await supabase.from('hang_bang').delete().eq('id', id)

      if (response.status !== 204) {
        return toast.error('Xóa hạng bằng không thành công.')
      }
      toast.success('Xóa hạng bằng thành công.')
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
        title={`Xóa hạng bằng: ${hangBang.ten_hang_bang}`}
        description="Bạn có chắc chắn xóa hạng bằng này không?"
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
            onClick={() => handleDelete(hangBang.id)}
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

export default DeleteLicenceModal
