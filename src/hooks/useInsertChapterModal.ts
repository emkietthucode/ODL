import { create } from 'zustand'

interface InsertChapterModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useInsertChapterModal = create<InsertChapterModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useInsertChapterModal
