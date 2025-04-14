'use client'

import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PathBar from '../../../../../../public/images/path-bar-vector.svg'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import QuestionCarousel from '@/components/question-carousel'
import QuestionTable from '@/components/learning-path/question-table'
import usePathInfo from '@/hooks/use-path-info'
import { LearningQuestionDTO } from '@/types/dto/types'

function LearningPage() {
  const { chapterId, licenseName } = useParams<{
    chapterId: string
    licenseName: string
  }>()

  const pathInfo = usePathInfo()
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 200,
    total: 0,
  })
  const [questions, setQuestions] = useState<LearningQuestionDTO[]>([])
  const { user, loading } = useAuth()
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc('fetch_user_questions', {
          chapter_id: chapterId,
          user_id: user.id,
          page: pagination.page,
          record_limit: pagination.limit,
          learning_path_id: pathInfo?.learningPath?.id,
        })

        setQuestions(data)
        setPagination((prev) => ({
          ...prev,
          total: data[0]?.total_records,
        }))
        setSelectedQuestion(0)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchData()
  }, [user, pagination.page])

  const handleAnswerChange = async (answerId: string, index: number) => {
    try {
      const { data, error } = await supabase.rpc('update_user_answers', {
        question_id: questions[selectedQuestion]?.id,
        user_id: user?.id,
        answer_id: answerId,
        path_id: pathInfo?.learningPath?.id,
      })

      if (error) {
        console.error(error)
      } else {
        setQuestions((prev) =>
          prev.map((q, i) =>
            i === index ? { ...q, cau_tra_loi: answerId } : q
          )
        )
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const getAnswerBackground = (question: LearningQuestionDTO) => {
    if (question.cau_tra_loi) {
      const correctAnswer = question.ds_lua_chon.find(
        (answer) => answer.la_lua_chon_dung
      )

      if (question.cau_tra_loi === correctAnswer?.id) {
        return 'bg-[#A3C9A8]'
      } else {
        return 'bg-[#C88572]'
      }
    } else {
      return 'bg-light-purple'
    }
  }

  return (
    <div>
      <div className="w-full max-w-[940px] h-[70px] mt-10 mx-auto relative bg-light-purple-admin flex">
        <div className="mr-[35px]">
          <Image src={PathBar} alt="Bar" className=" top-0 left-0" />
          <span className="absolute top-1/2 left-[25px] -translate-y-[50%] font-bold text-white text-[18px]">
            Chương 1:
          </span>
        </div>
        <div className="flex">
          <div className="flex flex-col text-[12px] text-purple h-full justify-between w-[275px] py-3">
            <span>Tiến độ: 1/200</span>
            <span>Tỉ lệ đúng: 100%</span>
          </div>
          <div className="py-3">
            {' '}
            <Separator
              orientation="vertical"
              className="bg-purple w-[3px] rounded-full py-3"
            />
          </div>
          {/* Question carousel */}
          <div className="flex-1 w-[400px] relative h-full ml-4">
            <QuestionCarousel
              isLastSlide={Math.ceil(pagination.total / pagination.limit) - 1}
            >
              {Array.from({
                length: Math.ceil(pagination.total / 24),
              }).map((_, bigIndex) => (
                <div
                  key={bigIndex}
                  className="w-full max-w-[380px] flex justify-start flex-wrap gap-[5px] pl-5"
                >
                  {questions
                    .slice(bigIndex * 24, bigIndex * 24 + 24)
                    .map((q, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedQuestion(index + bigIndex * 24)
                        }
                        className={cn(
                          `w-6 h-6 rounded-full text-purple font-bold ${getAnswerBackground(
                            q
                          )} text-center`,
                          index + bigIndex * 24 === selectedQuestion &&
                            'ring ring-purple ring-offset-2',
                          q.cau_tra_loi && 'text-white'
                        )}
                      >
                        {index + 1 + bigIndex * 24}
                      </button>
                    ))}
                </div>
              ))}
            </QuestionCarousel>
          </div>
        </div>
      </div>
      <QuestionTable
        question={questions[selectedQuestion]}
        index={selectedQuestion}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  )
}

export default LearningPage
