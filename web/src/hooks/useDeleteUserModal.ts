import { NguoiDung } from '@/types/types'
import { create } from 'zustand'

interface DeleteUserModal {
  isOpen: boolean
  item: NguoiDung | null
  onOpen: (item: NguoiDung) => void
  onClose: () => void
  refreshTrigger: number
  triggerRefresh: () => void
}

const useDeleteUserModal = create<DeleteUserModal>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set({ isOpen: true, item }),
  onClose: () => set({ isOpen: false, item: null }),
  refreshTrigger: 0,
  triggerRefresh: () =>
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}))

export default useDeleteUserModal
