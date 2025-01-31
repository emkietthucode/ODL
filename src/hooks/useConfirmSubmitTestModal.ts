import { QuestionDTO } from '@/types/dto/types'
import { create } from 'zustand'

interface ConfirmSubmitTestModal {
  testCompletionTimeSec: number
  isOpen: boolean
  item: QuestionDTO[]
  onOpen: (callback?: () => void) => void
  onClose: () => void
  onCloseCallback: (() => void) | null
  setQuestions: (questions: QuestionDTO[]) => void
  setTestCompletionTimeSec: (userTestCompletionTimeSec: number) => void
}

const useConfirmSubmitTestModal = create<ConfirmSubmitTestModal>((set) => ({
  testCompletionTimeSec: 0,
  isOpen: false,
  item: [],
  onCloseCallback: null,
  onOpen: (callback) => set({ isOpen: true, onCloseCallback: callback }),
  onClose: () =>
    set((state) => {
      if (state.onCloseCallback) state.onCloseCallback() // Execute callback if defined
      return { isOpen: false, onCloseCallback: null }
    }),
  setQuestions: (questions) => set({ item: questions }),
  setTestCompletionTimeSec: (userTestCompletionTimeSec) =>
    set({ testCompletionTimeSec: userTestCompletionTimeSec }),
}))

export default useConfirmSubmitTestModal
