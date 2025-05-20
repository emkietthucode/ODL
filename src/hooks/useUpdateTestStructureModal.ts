import { CauTrucBaiTest } from '@/types/types'
import { create } from 'zustand'

interface UpdateTestStructureModal {
  isOpen: boolean
  item: CauTrucBaiTest | null
  onOpen: (item: CauTrucBaiTest) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useUpdateTestStructureModal = create<UpdateTestStructureModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useUpdateTestStructureModal
