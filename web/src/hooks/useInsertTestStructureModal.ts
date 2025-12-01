import { create } from 'zustand'

interface InsertTestStructureModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useInsertTestStructureModal = create<InsertTestStructureModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useInsertTestStructureModal
