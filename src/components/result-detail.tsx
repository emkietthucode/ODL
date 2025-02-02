'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Label } from '@/components//ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'
import { LuaChon } from '@/types/types'
import { QuestionDTO } from '@/types/dto/types'

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['vietnamese'],
})

interface ResultDetailPageProps {
  questions: QuestionDTO[]
  testDesc: string
  userCompleteTime: string
  userScore: number
  testTotalScore: number
}

const ResultDetailPage: React.FC<ResultDetailPageProps> = ({
  questions,
  testDesc,
  userCompleteTime,
  userScore,
  testTotalScore,
}) => {
  const [selectedQuestionIndex, setSelectedQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    questions?.map((question, questionIndex) => {
      if (!question.userAnswerIndex || !question.answers) {
        return `answer-${questionIndex}-null`
      }

      const userAnswerPosition = question.answers.findIndex(
        (answer) => answer.id === question.userAnswerIndex
      )

      return `answer-${questionIndex}-${
        userAnswerPosition !== -1 ? userAnswerPosition : 'null'
      }`
    }) || []
  )
  if (!questions) {
    return null
  }

  const handlePrevious = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestion((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestion((prev) => prev + 1)
    }
  }

  const getQuestionImg = (imgId: string) => {
    return ''
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedQuestionIndex, handleNext, handlePrevious]) // Re-run effect if selectedQuestionIndex changes
  return (
    <main className="bg-white mx-auto max-h-full my-[64px] h-full">
      <div className="flex flex-col justify-around items-center h-full">
        <div className="flex flex-col justify-start gap-5  h-full w-[60%]">
          <div className="text-5xl font-bold text-purple ml-10">
            KẾT QUẢ THI THỬ
          </div>
          <div className="w-full h-[20%] bg-violet-300 flex items-center">
            <div className="flex justify-between items-center w-full p-10">
              <div className="flex flex-col text-white italic">
                <div>Đề: {testDesc}</div>
                <div>Hoàn thành: {userCompleteTime}</div>
                <div>
                  Điểm: {userScore}/{testTotalScore}
                </div>
              </div>
              <div className="bg-violet-50 rounded-2xl h-[120px] w-[739px]">
                <ol className="list-none flex flex-wrap  gap-2 p-4">
                  {questions.map((_, index: number) => (
                    <li key={index} className="flex justify-center">
                      <Button
                        onClick={() => setSelectedQuestion(index)}
                        variant="outline"
                        size="icon"
                        className={cn(
                          `
                        w-8 h-8 text-lg
                        font-semibold 
                        rounded-full 
                        p-0 m-0 
                        text-purple 
                        bg-light-purple
                        hover:bg-light-purple/70 
                        hover:text-purple/70
                        transition-all
                        border-separate"
                        `,
                          selectedQuestionIndex === index &&
                            'ring-2 ring-purple ring-offset-2 font-bold',
                          !questions[index].userAnswerIndex
                            ? `` // No answer chosen
                            : questions[index].userAnswerIndex ===
                              questions[index].answers?.find(
                                (a) => a.la_lua_chon_dung
                              )?.id
                            ? `bg-custom-ol-green text-white hover:bg-custom-ol-green/70 hover:text-white/90` // Correct answer
                            : `bg-custom-brown text-white hover:bg-custom-brown/70 hover:text-white/90` // Incorrect answer
                        )}
                      >
                        {index + 1}
                      </Button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="flex gap-2 h-[550px]">
            <div className="w-[65%] bg-neutral-200 flex flex-col justify-start items-center p-5 gap-2">
              <div className="flex justify-between items-center w-full text-lg">
                <FaArrowLeft
                  onClick={handlePrevious}
                  className="text-purple hover:text-purple/80 cursor-pointer"
                />
                <div className="font-bold">{`Câu hỏi ${
                  selectedQuestionIndex + 1
                }:`}</div>
                <FaArrowRight
                  onClick={handleNext}
                  className="text-purple hover:text-purple/80 cursor-pointer"
                />
              </div>
              <div
                className={`${montserratAlternates.className} self-start mb-2`}
              >
                {questions[selectedQuestionIndex]?.question?.noi_dung_cau_hoi}
              </div>
              {getQuestionImg(
                questions[selectedQuestionIndex]?.question?.hinh_anh || ''
              ) && (
                <Image
                  src={getQuestionImg(
                    questions[selectedQuestionIndex]?.question?.hinh_anh || ''
                  )}
                  alt=""
                />
              )}
            </div>
            <div className="w-[35%] flex flex-col h-full gap-3">
              <RadioGroup
                value={selectedAnswers[selectedQuestionIndex]}
                className="h-full"
                disabled={true}
              >
                {questions[selectedQuestionIndex]?.answers?.map(
                  (answer: LuaChon, index: number) => {
                    const isSelected =
                      questions[selectedQuestionIndex]?.userAnswerIndex ===
                      answer.id
                    const isCorrect = answer.la_lua_chon_dung

                    let bgColor = 'bg-neutral-200' // Default background

                    if (isCorrect) {
                      bgColor = 'bg-custom-light-green' // Always highlight the correct answer in green
                    } else if (isSelected) {
                      bgColor = 'bg-custom-light-brown' // Highlight wrong selected answers in red
                    }

                    return (
                      <Label
                        key={index}
                        htmlFor={`r${selectedQuestionIndex}-${index}`}
                        className={cn(`
                        grow
                        ${bgColor}
                        flex 
                        items-start 
                        p-3 
                        gap-2 
                        cursor-pointer
                        border
                        border-transparent 
                      `)}
                      >
                        <RadioGroupItem
                          value={`answer-${selectedQuestionIndex}-${index}`}
                          id={`r${selectedQuestionIndex}-${index}`}
                        />
                        <div className="text-sm text-neutral-500 font-medium">
                          {answer.noi_dung_lua_chon}
                        </div>
                      </Label>
                    )
                  }
                )}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResultDetailPage
