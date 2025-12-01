import { create } from 'zustand'

interface InsertStateModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useInsertStateModal = create<InsertStateModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useInsertStateModal
