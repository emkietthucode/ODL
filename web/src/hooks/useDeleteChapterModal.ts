import { Chuong } from '@/types/types'
import { create } from 'zustand'

interface DeleteChapterModal {
  isOpen: boolean
  item: Chuong | null
  onOpen: (item: Chuong) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useDeleteChapterModal = create<DeleteChapterModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useDeleteChapterModal
