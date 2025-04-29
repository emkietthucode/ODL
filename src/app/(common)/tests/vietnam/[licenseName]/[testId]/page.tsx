'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestComponent from '@/components/test-component-v2'
import supabase from '@/utils/supabase/supabase'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { QuestionDTO } from '@/types/dto/types'
import { DeThi, LuaChon } from '@/types/types'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TestPage = () => {
  const { item: questions, setQuestions } = useConfirmSubmitTestModal()
  const [testTitle, setTestTitle] = useState('')
  const params = useParams<{
    licenseName: string
    testId: string
  }>()
  const t = useTranslations('TestPage')

  useEffect(() => {
    const fetchTestInfo = async () => {
      const { data, error } = await supabase
        .from('de_thi')
        .select('ten_de_thi')
        .eq('id', params.testId)
        .single()
      if (error) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy tên đề thi')
      }
      setTestTitle(data.ten_de_thi)
    }
    fetchTestInfo()
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('cau_hoi_de_thi')
        .select(
          `
            cau_hoi:ma_cau_hoi (*, lua_chon ( * ) )
          `
        )
        .eq('ma_de_thi', params.testId)

      if (error) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
      }

      const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
        question: item.cau_hoi,
        answers: item.cau_hoi.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
          ? shuffleAnswers(item.cau_hoi.lua_chon)
          : item.cau_hoi.lua_chon.sort(
              (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
            ),
      }))

      setQuestions(formattedQuestions)
    }

    fetchQuestions()
  }, [])
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full my-10 ">
        {/* <TestComponent
          title={testTitle}
          questions={questions}
          setQuestions={setQuestions}
        /> */}
        <TestComponent />
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestPage
