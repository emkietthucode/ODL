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
        title={`XÓA HẠNG BẰNG`}
        description="Bạn có chắc chắn xóa hạng bằng này?"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => handleDelete(hangBang.id)}
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

export default DeleteLicenceModal
