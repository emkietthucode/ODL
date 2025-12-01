import { create } from 'zustand'

interface InsertCountryModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useInsertCountryModal = create<InsertCountryModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useInsertCountryModal
