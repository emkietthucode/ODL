'use client'

import useDeleteUserModal from '@/hooks/useDeleteUserModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const DeleteUserModal = () => {
  const {
    isOpen,
    onClose,
    item: nguoiDung,
    triggerRefresh,
  } = useDeleteUserModal()
  const [isLoading, setIsLoading] = useState(false)

  if (!nguoiDung) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error: errorAuth } = await supabase.auth.admin.deleteUser(id)

      if (errorAuth) {
        console.log(errorAuth)
        return toast.error('Xóa người dùng không thành công.')
      }

      const { error: errorTable } = await supabase
        .from('nguoi_dung')
        .delete()
        .eq('id', id)

      if (errorTable) {
        console.log(errorTable)
        return toast.error('Xóa người dùng không thành công.')
      }

      toast.success('Xóa người dùng thành công.')
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
        title={`XÓA NGƯỜI DÙNG`}
        description="Bạn chắc chắn xóa người dùng này?"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple/90 text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => handleDelete(nguoiDung.id)}
          >
            XÁC NHẬN
          </Button>
          <Button
            className="bg-neutral-400 hover:bg-neutral-400/90 text-white font-semibold min-w-36 self-center"
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

export default DeleteUserModal
