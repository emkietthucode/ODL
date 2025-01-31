'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestPass from '@/components/test-pass'
import TestFail from '@/components/test-fail'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { CauTrucDeThi } from '@/types/types'
import { QuestionDTO } from '@/types/dto/types'

const ResultPage = () => {
  const { item: questions } = useConfirmSubmitTestModal()
  const [userCorrectAnswers, setUserCorrectAnswers] = useState(0)
  const [testResult, setTestResult] = useState<boolean>(false)
  const [isFailOnSpecialQuestion, setIsFailedOnSpecialTest] =
    useState<boolean>(false)
  const [testStructure, setTestStructure] = useState<CauTrucDeThi[]>([])
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()

  const checkTestStatus = (questions: QuestionDTO[]) => {
    let totalCorrectAnswers = 0
    let isFailedOnSpecialTest = false

    // Loop through all the questions
    for (const questionDTO of questions) {
      let questionCorrectAnswers = 0

      if (questionDTO?.answers && questionDTO?.question) {
        // Check each answer
        for (const answer of questionDTO.answers) {
          if (
            answer.la_lua_chon_dung &&
            answer.id === questionDTO.userAnswerIndex
          ) {
            questionCorrectAnswers++
          }
        }

        if (questionDTO.question.la_cau_diem_liet) {
          if (questionCorrectAnswers === 0) {
            isFailedOnSpecialTest = true
          }
        }
      }

      // Accumulate correct answers
      totalCorrectAnswers += questionCorrectAnswers
    }

    // Set state after calculation is done to avoid triggering re-renders during the loop
    setUserCorrectAnswers(totalCorrectAnswers)
    setTestResult(totalCorrectAnswers < testStructure[0].so_cau_de_dat)
    setIsFailedOnSpecialTest(isFailedOnSpecialTest)

    return totalCorrectAnswers
  }

  // Get Test Format
  useEffect(() => {
    const fetchTestFormat = async () => {
      const { data, error } = await supabase.rpc('get_cau_truc_by_de_thi', {
        de_thi_id: params.testId,
      })

      if (error) {
        console.error('Error:', error)
        return toast.error('Lỗi khi lấy cấu trúc đề thi')
      }
      setTestStructure(data)
    }
    fetchTestFormat()
  }, [])

  // Separate useEffect for checkTestStatus
  useEffect(() => {
    if (testStructure.length > 0) {
      checkTestStatus(questions)
    }
  }, [testStructure, questions])

  if (testStructure.length === 0 || questions.length === 0) {
    return null
  }

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full ">
        {testResult ? (
          <TestFail
            totalQuestion={testStructure[0].so_luong_cau_hoi}
            requiredCorrectAnswer={testStructure[0].so_cau_de_dat}
            userCorrectAnswers={userCorrectAnswers}
            isFailOnSpecialQuestion={isFailOnSpecialQuestion}
          />
        ) : (
          <TestPass
            totalQuestion={questions.length}
            requiredCorrectAnswer={testStructure[0].so_cau_de_dat}
            userCorrectAnswers={userCorrectAnswers}
          />
        )}
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default ResultPage
