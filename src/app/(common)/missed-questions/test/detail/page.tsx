'use client'
import ResultDetailPage from '@/components/result-detail'
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
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()

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
