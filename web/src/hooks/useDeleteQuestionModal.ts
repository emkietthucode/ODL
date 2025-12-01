import { CauHoi } from '@/types/types'
import { create } from 'zustand'

interface DeleteQuestionModal {
  isOpen: boolean
  item: CauHoi | null
  onOpen: (item: CauHoi) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useDeleteQuestionModal = create<DeleteQuestionModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useDeleteQuestionModal
