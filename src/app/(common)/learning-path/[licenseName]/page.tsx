'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Chuong } from '@/types/types'
import { useParams } from 'next/navigation'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'

import { QuestionDTO } from '@/types/dto/types'
import { LuaChon } from '@/types/types'
import LearningPathComponent from '@/components/learning-path-component'
import useAuth from '@/hooks/useAuth'
import { LockKeyhole } from 'lucide-react'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface AnsweredQuestion {
  id: string
  ma_cau_hoi: string
  ma_chuong: string
  ma_lua_chon: string
}

function LearningPathPage() {
  const params = useParams<{ licenseName: string }>()

  const auth = useAuth()

  const [chapters, setChapters] = useState<Chuong[]>([])
  const [selectedChapter, setSelectedChapter] = useState<string>()
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([])

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase.from('chuong').select().limit(4)
      if (error || !data) {
        console.log(error)
        return toast.error('Lấy dữ liệu chương không thành công')
      }
      setChapters(data)
      setSelectedChapter(data[0].id)
    }
    fetchChapters()
  }, [])

  //   useEffect(() => {
  //     const fetchQuestions = async () => {
  //       const { data, error } = await supabase
  //         .from('cau_hoi')
  //         .select(
  //           `
  //             *,
  //             lua_chon (
  //               *
  //             )
  //           `
  //         )
  //         .limit(25)

  //       if (error) {
  //         console.error(error)
  //         return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
  //       }

  //       const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
  //         question: item,
  //         answers: item.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
  //           ? shuffleAnswers(item.lua_chon)
  //           : item.lua_chon.sort(
  //               (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
  //             ),
  //       }))

  //       setQuestions(formattedQuestions)
  //     }

  //     fetchQuestions()
  //   }, [selectedChapter])

  useEffect(() => {
    const handleFetchQuestions = async () => {
      // Fetch questions
      const { data, error } = await supabase.rpc('get_questions_with_answers', {
        ma_chuong_value: selectedChapter,
      })

      if (error) {
        console.error(error)
        return
      }

      let answeredData: AnsweredQuestion[] = []

      // Fetch answered questions only if user is logged in
      if (auth.user?.id) {
        const { data: answered, error: answeredError } = await supabase.rpc(
          'get_answered',
          {
            user_id: auth.user?.id,
            chapter_id: selectedChapter,
          }
        )

        if (answeredError) {
          console.error(answeredError)
        } else {
          answeredData = answered.answered_records || [] // Ensure it's an array
        }
      }

      // Process questions
      const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
        question: item,
        answers: item.ds_lua_chon.map((a: LuaChon) => a),
        userAnswerId:
          answeredData.find((a: AnsweredQuestion) => a.ma_cau_hoi === item.id)
            ?.ma_lua_chon || '',
      }))

      setQuestions(formattedQuestions)
      setAnsweredQuestions(answeredData)
    }

    if (selectedChapter) {
      handleFetchQuestions()
    }
  }, [selectedChapter, auth.user?.id])

  return (
    <div className="flex flex-col items-center h-full relative">
      <div className="flex flex-col gap-[32px] justify-between items-center h-full w-full max-w-screen-xl ">
        <div className="flex justify-start w-full bg-light-purple mt-16">
          <div className="flex flex-col z-20 mt-20 w-full px-40">
            <hr className="w-28 h-1 bg-purple border-0 rounded-sm  dark:bg-purple" />
            <div className="text-purple text-2xl font-bold my-5">
              HỌC CÂU HỎI LÝ THUYẾT
            </div>
            <div className="w-[80%]">
              Dưới đây là bộ tài liệu 200 câu lý thuyết thi lái xe mô
              tô của Tổng Cục Đường Bộ Việt Nam dùng cho thi sát hạch lý thuyết
              để cấp giấy phép lái xe hạng A1
            </div>

            <div className="mt-12 flex gap-8 justify-center">
              {chapters.map((chapter, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedChapter(chapter.id)}
                  className={cn(
                    `
                                        text-lg 
                                        text-purple 
                                        font-medium 
                                        rounded-full 
                                        bg-white 
                                        hover:bg-white/80 
                                        border-purple 
                                        border-2 uppercase`,

                    selectedChapter === chapter.id &&
                      'ring-4 ring-purple/50 font-bold'
                  )}
                >
                  {chapter.ten_chuong}
                </Button>
              ))}
            </div>

            <div className="px-4 py-8 bg-white rounded-md my-8">
              Chương 1: 100 câu về kiến thức luật
            </div>
          </div>
        </div>

        <LearningPathComponent
          initialQuestions={questions}
          initialAnswers={[
            ...questions.map((q) => (q.userAnswerId ? q.userAnswerId : '')),
          ]}
        />
      </div>
    </div>
  )
}

export default LearningPathPage
