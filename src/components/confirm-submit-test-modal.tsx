'use client'

import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { v4 as uuidv4 } from 'uuid'
import { usePathname, useRouter } from 'next/navigation'

const ConfirmSubmitTestModal = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, onClose } = useConfirmSubmitTestModal()
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const handleConfirmClick = () => {
    setIsLoading(true)
    const uniqueID = uuidv4()
    router.push(`${pathname}/${uniqueID}`)
    onClose()
    setIsLoading(false)
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
            onClick={handleConfirmClick}
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
