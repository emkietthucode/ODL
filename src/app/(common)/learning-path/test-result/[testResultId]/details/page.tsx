'use client'

import QuestionCarousel from '@/components/question-carousel'
import { cn } from '@/lib/utils'
import { LearningQuestionDTO } from '@/types/dto/types'
import supabase from '@/utils/supabase/supabase'
import { get } from 'lodash'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function ResultDetails() {
  const { testResultId } = useParams<{ testResultId: string }>()
  const [result, setResult] = useState<{
    so_luong_cau_hoi: number
    so_cau_dung: number
    pass: boolean
    yeu_cau: number
    thoi_gian: number
    ma_de_thi: string
  }>({
    so_luong_cau_hoi: 0,
    so_cau_dung: 0,
    pass: false,
    yeu_cau: 0,
    thoi_gian: 0,
    ma_de_thi: '',
  })
  const [questions, setQuestions] = useState<LearningQuestionDTO[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data, error } = await supabase.rpc('fetch_test_result', {
          result_id: testResultId,
        })

        setResult(data)

        const [
          { data: questionsData, error: errorQuestions },
          { data: answersData, error: errorAnswers },
        ] = await Promise.all([
          await supabase.rpc('fetch_test_questions', {
            test_id: data.ma_de_thi,
          }),
          await supabase.rpc('fetch_result_details', {
            result_id: testResultId,
          }),
        ])

        answersData.map((item: any) => {
          const question = questionsData.find(
            (question: LearningQuestionDTO) => question.id === item.id_cau_hoi
          )

          question.cau_tra_loi = item.ma_lua_chon
        })

        setQuestions(questionsData)
      } catch (error: any) {
        console.log('Error in ResultDetails:', error)
      }
    }

    fetchResult()
  }, [testResultId])

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
      return 'bg-[#C88572]'
    }
  }

  const findCorrectAnswer = (question: LearningQuestionDTO) => {
    return question?.ds_lua_chon.find((answer) => answer.la_lua_chon_dung)?.id
  }

  const getLabelBackground = (
    question: LearningQuestionDTO,
    answer: string | undefined,
    index: number
  ) => {
    if (question?.ds_lua_chon[index]?.la_lua_chon_dung) {
      return 'bg-[#E2EEE4]'
    } else {
      if (answer === question?.ds_lua_chon[index]?.id && answer) {
        return 'bg-[#EED9D3]'
      } else {
        return 'bg-[#ECEDF4]'
      }
    }
  }

  const handleChangeQuestion = (change: number) => {
    const changed = selectedQuestion + change

    if (changed < 0 || changed >= questions.length) {
      return
    }

    setSelectedQuestion(changed)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        handleChangeQuestion(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        handleChangeQuestion?.(1)
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [handleChangeQuestion])

  return (
    <div className="max-w-[1120px] mx-auto">
      <div className="w-full h-[116px] py-4 px-11 mt-10 mx-auto relative bg-light-purple flex justify-between">
        <div className="flex flex-col items-center">
          <p className="uppercase text-xl text-purple font-bold">
            KẾT QUẢ THI THỬ
          </p>
          <p
            className={cn(
              'uppercase font-extrabold text-[40px]',
              result.pass ? 'text-[#93B597]' : 'text-[#C88572]'
            )}
          >
            {result.pass ? 'ĐẠT' : 'KHÔNG ĐẠT'}
          </p>
        </div>
        <div className="ml-20 text-purple italic">
          <p>Đề: 01</p>
          <p>Hoàn thành: 12:00</p>
          <p>
            Điểm: {result.so_cau_dung}/{result.so_luong_cau_hoi}
          </p>
        </div>
        <div className="px-8 bg-[#F1EEFB] rounded-[18px]">
          <div className="flex-1 w-[400px] relative h-full ml-4">
            <QuestionCarousel initialSlide={0} className="px-4">
              {Array.from({
                length: 2,
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
                          `w-6 h-6 rounded-full text-white font-bold text-center ${getAnswerBackground(
                            q
                          )}`,
                          index + bigIndex * 24 === selectedQuestion &&
                            'ring ring-purple ring-offset-2'
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

      <div className="w-full my-[9px] min-h-[464px] flex gap-[11px] items-stretch">
        <div className="w-[740px] min-h-[426px] bg-[#EDEDED] p-3">
          <p className="w-full font-bold text-center">
            Question {selectedQuestion + 1}
          </p>
          <p className="text-[12px] my-4">
            {questions[selectedQuestion]?.noi_dung_cau_hoi || ''}
          </p>
        </div>
        <div className="flex-1 flex flex-col min-h-[426px]">
          <RadioGroup
            className="flex-1 flex flex-col"
            value={
              questions[selectedQuestion]?.cau_tra_loi ||
              findCorrectAnswer(questions[selectedQuestion])
            }
          >
            {Array.from({ length: 4 }).map((_, selectionIndex) => (
              <Label
                key={selectionIndex}
                htmlFor={`r${selectionIndex}`}
                className={`
            flex-1
            ${getLabelBackground(
              questions[selectedQuestion],
              questions[selectedQuestion]?.cau_tra_loi,
              selectionIndex
            )}
            flex
            items-start
            p-3
            gap-2
            cursor-pointer
            border
            border-transparent
            active:scale-80
            transition-all
            duration-150`}
              >
                <RadioGroupItem
                  disabled
                  value={
                    questions[selectedQuestion]?.ds_lua_chon[selectionIndex]
                      ?.id || 'undefined'
                  }
                  id={`r${selectionIndex}`}
                />
                <div className="text-sm text-neutral-500 font-medium">
                  {questions[selectedQuestion]?.ds_lua_chon[selectionIndex]
                    ?.noi_dung_lua_chon || ''}
                </div>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default ResultDetails
