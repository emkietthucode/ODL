import { HangBang } from '@/types/types'
import { create } from 'zustand'

interface UpdateLicenceModal {
  isOpen: boolean
  item: HangBang | null
  onOpen: (item: HangBang) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useUpdateLicenceModal = create<UpdateLicenceModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useUpdateLicenceModal
