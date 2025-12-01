import { QuestionDTO } from '@/types/dto/types'
import { create } from 'zustand'

interface ConfirmSubmitTestModal {
  testCompletionTimeSec: number
  isOpen: boolean
  item: QuestionDTO[]
  onOpen: (openCallback?: () => void, closeCallback?: () => void) => void
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
  onOpen: (openCallback, closeCallback) => {
    if (openCallback) {
      openCallback()
    }
    set({ isOpen: true, onCloseCallback: closeCallback })
  },
  onClose: () =>
    set((state) => {
      if (state.onCloseCallback) {
        state.onCloseCallback()
      }
      return { isOpen: false, onCloseCallback: null }
    }),
  setQuestions: (questions) => set({ item: questions }),
  setTestCompletionTimeSec: (userTestCompletionTimeSec) =>
    set({ testCompletionTimeSec: userTestCompletionTimeSec }),
}))

export default useConfirmSubmitTestModal
