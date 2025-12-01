import { KhuVuc } from '@/types/types'
import { create } from 'zustand'

interface UpdateCountryModal {
  isOpen: boolean
  item: KhuVuc | null
  onOpen: (item: KhuVuc) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useUpdateCountryModal = create<UpdateCountryModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useUpdateCountryModal
