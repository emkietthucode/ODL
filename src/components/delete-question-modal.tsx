'use client'

import useDeleteQuestionModal from '@/hooks/useDeleteQuestionModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const DeleteQuestionModal = () => {
  const {
    isOpen,
    onClose,
    item: cauHoi,
    triggerRefresh,
  } = useDeleteQuestionModal()
  const [isLoading, setIsLoading] = useState(false)

  if (!cauHoi) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // Delete related lua_chon records first
      const { error: luaChonError } = await supabase
        .from('lua_chon')
        .delete()
        .eq('ma_cau_hoi', id)

      if (luaChonError) {
        console.log(luaChonError)
        return toast.error('Xóa lựa chọn không thành công.')
      }

      // Delete image from storage
      const { error: storageError } = await supabase.storage
        .from('hinh_anh_cau_hoi')
        .remove([`${id}`])

      // Delete the question
      const { error } = await supabase
        .from('cau_hoi')
        .delete()
        .eq('id', id)
        .select()

      if (error) {
        console.log(error)
        return toast.error('Xóa câu hỏi không thành công.')
      }
      toast.success('Xóa câu hỏi thành công.')
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
        title={`XÓA CÂU HỎI`}
        description="Bạn có chắc chắn xóa câu hỏi này?"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple/90 text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => handleDelete(cauHoi.id)}
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

export default DeleteQuestionModal
