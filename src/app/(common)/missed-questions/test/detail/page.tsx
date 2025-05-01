'use client'
import ResultDetailPage from '@/components/result-detail'
import useAuth from '@/hooks/useAuth'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { QuestionDTO } from '@/types/dto/types'
import { LuaChon } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TestDetailPage = () => {
  const { item: questions, setQuestions } = useConfirmSubmitTestModal()
  const [testDesc, setTestDesc] = useState<string>('')
  const [userCompleteTime, setUserCompleteTime] = useState<string>('')
  const [userScore, setUserScore] = useState<number>(0)
  const [testTotalScore, setTestTotalScore] = useState<number>(0)
  const { user } = useAuth()

  useEffect(() => {
    const checkAndRemoveCorrectAnswers = async () => {
      if (!questions || questions.length === 0) return

      for (const question of questions) {
        if (!question.question || !question.answers || !question.userAnswerId)
          continue

        // Find the correct answer
        const correctAnswer = question.answers.find(
          (answer) => answer.la_lua_chon_dung
        )
        if (!correctAnswer) continue

        // If user's answer matches the correct answer, remove from cau_hoi_thuong_sai
        if (question.userAnswerId === correctAnswer.id) {
          const { error } = await supabase
            .from('cau_hoi_thuong_sai')
            .delete()
            .eq('cau_hoi_id', question.question.id)
            .eq('nguoi_dung_id', user?.id)

          if (error) {
            console.error(
              'Error removing question from cau_hoi_thuong_sai:',
              error
            )
          }
        }
      }
    }
    if (user?.id == null) return

    checkAndRemoveCorrectAnswers()
  }, [questions])

  return (
    <ResultDetailPage
      questions={questions}
      testDesc={testDesc}
      userCompleteTime={userCompleteTime}
      userScore={userScore}
      testTotalScore={testTotalScore}
    />
  )
}

export default TestDetailPage
