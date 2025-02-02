'use client'
import F81MissedQuestions from '../../../../../public/images/f8.1.svg'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestComponent from '@/components/test-component'
import supabase from '@/utils/supabase/supabase'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { QuestionDTO } from '@/types/dto/types'
import { LuaChon } from '@/types/types'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const MissedQuestionsPage = () => {
  const { item: questions, setQuestions } = useConfirmSubmitTestModal()
  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('cau_hoi')
        .select(
          `
          *,
          lua_chon (
            *
          )
        `
        )
        .limit(25)

      if (error) {
        console.error(error)
        return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
      }

      const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
        question: item,
        answers: item.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
          ? shuffleAnswers(item.lua_chon)
          : item.lua_chon.sort(
              (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
            ),
      }))

      setQuestions(formattedQuestions)
    }

    fetchQuestions()
  }, [])
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full ">
        <div className="flex flex-col gap-[16px] justify-between items-center h-full w-[71%] ml-16">
          <div className="flex flex-col gap-[32px] z-20 mt-10 ">
            <div className="text-purple text-4xl font-bold">
              ÔN LUYỆN NHỮNG CÂU HỎI THƯỜNG SAI
            </div>
            <div className="w-[75%] text-sm">
              Lưu trữ các câu hỏi mà người dùng đã trả lời sai trong quá trình
              luyện thi. Tính năng này giúp bạn tập trung ôn lại những kiến thức
              chưa vững, cải thiện điểm số và nâng cao khả năng vượt qua kỳ thi
              lý thuyết.
            </div>
          </div>
        </div>
        {questions.length === 0 ? (
          <div className="flex flex-col w-[71%] my-[64px] justify-center items-center">
            <div
              className="
              w-full h-[46px] 
              bg-custom-beige 
              flex justify-center items-center 
              font-bold text-xl text-white"
            >
              SỐ CÂU: 0
            </div>
            <Image src={F81MissedQuestions} alt="" className="my-10" />
            <div className="font-medium text-xl">
              CHÚC MỪNG! HIỆN TẠI BẠN KHÔNG CÓ CÂU HỎI THƯỜNG SAI
            </div>
            <div className="font-medium text-xl text-blue-400 mt-[96px] mb-[16px]">
              Chúng tôi còn nhiều đề khác, xem ngay!
            </div>
            <Button
              onClick={() => router.push('/tests')}
              className="
              bg-blue-100 hover:bg-blue-100/90 
              rounded-2xl text-sm 
              text-blue-400 font-semibold
              h-full shadow-md"
            >
              LÀM ĐỀ KHÁC
            </Button>
          </div>
        ) : (
          <TestComponent
            title="25 cau dau"
            questions={questions}
            setQuestions={setQuestions}
          />
        )}
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default MissedQuestionsPage
