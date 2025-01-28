import { QuestionDTO } from '@/types/dto/types'
import { create } from 'zustand'

interface ConfirmSubmitTestModal {
  isOpen: boolean
  item: QuestionDTO[]
  onOpen: (item: QuestionDTO[], callback?: () => void) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
  onCloseCallback: (() => void) | null
}

const useConfirmSubmitTestModal = create<ConfirmSubmitTestModal>((set) => ({
  isOpen: false,
  item: [],
  onCloseCallback: null,
  onOpen: (item, callback) =>
    set({ isOpen: true, item, onCloseCallback: callback }),
  onClose: () =>
    set((state) => {
      if (state.onCloseCallback) state.onCloseCallback() // Execute callback if defined
      return { isOpen: false, item: [], onCloseCallback: null }
    }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useConfirmSubmitTestModal
