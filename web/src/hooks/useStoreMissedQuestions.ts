import { create } from 'zustand'

interface StoreMissedQuestions {
  questions: any[]
  setQuestions: (questions: any[]) => void
}

const useStoreMissedQuestions = create<StoreMissedQuestions>((set) => ({
  questions: [],
  setQuestions: (questions: any[]) => set({ questions: questions }),
}))

export default useStoreMissedQuestions
