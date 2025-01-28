'use client'

import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import Modal from './Modal'
import { useState } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-hot-toast'
import supabase from '@/utils/supabase/supabase'

const ConfirmSubmitTestModal = () => {
  const {
    isOpen,
    onClose,
    item: questions,
    triggerRefresh,
  } = useConfirmSubmitTestModal()
  const [isLoading, setIsLoading] = useState(false)

  if (!questions) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <div>
      <Modal
        title={`XÁC NHẬN NỘP BÀI`}
        description="Bạn có chắc chắn nộp bài không?"
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className="mt-3 flex gap-10 justify-center">
          <Button
            className="bg-purple hover:bg-purple/90 text-white font-semibold min-w-36 self-center"
            disabled={isLoading}
            type="submit"
            onClick={() => {}}
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

export default ConfirmSubmitTestModal
