'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestPass from '@/components/test-pass'
import TestFail from '@/components/test-fail'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { CauTrucDeThi } from '@/types/types'
import { QuestionDTO } from '@/types/dto/types'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'
import { useTranslations } from 'next-intl'
import Loading from '@/components/loading'

const ResultPage = () => {
  const { user } = useAuth()
  const { item: questions, testCompletionTimeSec } = useConfirmSubmitTestModal()
  const [userCorrectAnswers, setUserCorrectAnswers] = useState(0)
  const [testResult, setTestResult] = useState<boolean>(false)
  const [isFailOnSpecialQuestion, setIsFailedOnSpecialTest] =
    useState<boolean>(false)
  const [testStructure, setTestStructure] = useState<CauTrucDeThi[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()
  const t = useTranslations('ResultPage')

  const getBaseUrl = () => {
    // Extract base URL dynamically
    const segments = pathname.split('/')
    const baseUrl = `/${segments.slice(1, 4).join('/')}` // Keep only `/tests/{country}/{licenseName}`
    return baseUrl
  }

  const handleRedoTest = () => {
    router.push(`${getBaseUrl()}/${params.testId}`)
  }

  const handleDoOtherTest = () => {
    router.push(`${getBaseUrl()}`)
  }

  // Get Test Structure
  useEffect(() => {
    const fetchTestStructure = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.rpc('get_cau_truc_by_de_thi', {
        de_thi_id: params.testId,
      })

      if (error) {
        console.error('Error:', error)
        setIsLoading(false)
        return toast.error('Lỗi khi lấy cấu trúc đề thi')
      }
      setTestStructure(data)
    }
    fetchTestStructure()
  }, [])

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
            answer.id === questionDTO.userAnswerId
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

  // Separate useEffect for checkTestStatus
  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('ket_qua_lam_bai')
        .select()
        .eq('id', params.resultId)
      if (error || !data) {
        console.log(error)
        setIsLoading(false)
        return toast.error('Lỗi khi lấy kết quả bài thi')
      }
      setUserCorrectAnswers(data[0].diem)
      setTestResult(data[0].diem < testStructure[0].so_cau_de_dat)
      setIsFailedOnSpecialTest(data[0].ket_qua_bai_lam)
      setIsLoading(false)
    }

    if (testStructure.length > 0 && questions.length > 0) {
      checkTestStatus(questions)
      setIsLoading(false)
    } else if (testStructure.length > 0 && questions.length === 0) {
      fetchResult()
    }
  }, [testStructure, questions])

  useEffect(() => {
    const insertResult = async () => {
      setIsLoading(true)
      const { error: insertResultError } = await supabase
        .from('ket_qua_lam_bai')
        .insert({
          id: params.resultId,
          diem: userCorrectAnswers,
          ket_qua_bai_lam: testResult,
          thoi_gian_lam_bai: testCompletionTimeSec,
          ngay_lam_bai: new Date().toISOString(),
          ma_de_thi: params.testId,
          ma_nguoi_dung: user?.id,
        })
      if (insertResultError) {
        console.log(insertResultError)
        setIsLoading(false)
        return toast.error('Lỗi khi thêm kết kết quả vào cơ sở dữ liệu')
      }

      try {
        const insertPromises = questions.map(async (questionDTO) => {
          const { error } = await supabase
            .from('ket_qua_bai_lam_lua_chon')
            .insert({
              ma_ket_qua_lam_bai: params.resultId,
              ma_lua_chon: questionDTO.userAnswerId,
            })

          if (error) throw error
        })

        await Promise.all(insertPromises)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        return toast.error('Lỗi khi thêm kết quả vào cơ sở dữ liệu')
      }
    }
    if (user && testStructure.length > 0 && questions.length > 0) {
      insertResult()
    }
  }, [userCorrectAnswers, testResult])

  if (!testStructure) {
    return null
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-[650px] ">
        {testResult ? (
          <TestFail
            totalQuestion={testStructure[0]?.so_luong_cau_hoi}
            requiredCorrectAnswer={testStructure[0]?.so_cau_de_dat}
            userCorrectAnswers={userCorrectAnswers}
            isFailOnSpecialQuestion={isFailOnSpecialQuestion}
          />
        ) : (
          <TestPass
            totalQuestion={questions.length}
            requiredCorrectAnswer={testStructure[0]?.so_cau_de_dat}
            userCorrectAnswers={userCorrectAnswers}
          />
        )}
        <div className="flex flex-col gap-10 w-[60%] justify-center items-center">
          <div className="flex flex-col gap-6 text-blue-400 w-full justify-center items-center">
            <hr className="h-1 bg-purple border-0 dark:bg-purple w-full"></hr>
            <div className="flex justify-between items-center gap-[96px] w-[70%] font-medium text-base">
              <div>{t('notSatisfied')}</div>
              <Button
                onClick={handleRedoTest}
                className="bg-custom-light-active-blue hover:bg-custom-light-hover-blue rounded-full text-sm text-custom-normal-blue h-[30px] w-[112px] shadow-md uppercase"
              >
                {t('retestButton')}
              </Button>
            </div>
            <div className="flex justify-between items-center gap-[96px] w-[70%] font-medium text-base">
              <div>{t('otherTest')}</div>
              <Button
                onClick={handleDoOtherTest}
                className="bg-custom-light-active-blue hover:bg-custom-light-hover-blue rounded-full text-sm text-custom-normal-blue h-[30px] w-[123px] shadow-md uppercase"
              >
                {t('otherTestButton')}
              </Button>
            </div>
            <div className="flex justify-between items-center gap-[96px] w-[70%] font-medium text-base">
              <div>{t('reviewWrongQuestion')}</div>
              <Button
                onClick={() => router.push('/missed-questions')}
                className="bg-custom-light-active-blue hover:bg-custom-light-hover-blue rounded-full text-sm text-custom-normal-blue h-[30px] w-[150px] shadow-md uppercase"
              >
                {t('reviewWrongButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default ResultPage
