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
import CriticalStar from './critical-star'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const questionsPerPage = 22 // Number of questions to show per page

  const totalPages = Math.ceil(questions.length / questionsPerPage)
  const startIndex = currentPage * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const currentQuestions = questions.slice(startIndex, endIndex)

  useEffect(() => {
    if (questions) {
      setSelectedAnswers(
        questions.map((question, questionIndex) => {
          if (!question.userAnswerId || !question.answers) {
            return `answer-${questionIndex}-null`
          }

          const userAnswerPosition = question.answers.findIndex(
            (answer) => answer.id === question.userAnswerId
          )

          return `answer-${questionIndex}-${
            userAnswerPosition !== -1 ? userAnswerPosition : 'null'
          }`
        })
      )
    }
  }, [questions]) // Runs when `questions` changes

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

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const getQuestionImg = (imgId: string) => {
    return ''
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (selectedQuestionIndex > 0) {
          setSelectedQuestion((prev) => prev - 1)
          // If we're at the first question of the current page, go to previous page
          if (selectedQuestionIndex === startIndex) {
            handlePreviousPage()
          }
        }
      } else if (event.key === 'ArrowRight') {
        if (selectedQuestionIndex < questions.length - 1) {
          setSelectedQuestion((prev) => prev + 1)
          // If we're at the last question of the current page, go to next page
          if (selectedQuestionIndex === endIndex - 1) {
            handleNextPage()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    selectedQuestionIndex,
    currentPage,
    startIndex,
    endIndex,
    questions.length,
  ]) // Add dependencies
  return (
    <main className="bg-white mx-auto max-h-full my-[32px] h-full">
      <div className="flex flex-col justify-around items-center h-full">
        <div className="flex flex-col justify-start gap-5  h-full w-[75%]">
          <div className="w-full h-[116px] bg-light-purple flex items-center">
            <div className="flex justify-between items-center w-full p-10">
              <div className="flex flex-col justify-center items-center w-[20%]">
                <div className="font-bold text-xl text-custom-normal-violet">
                  KẾT QUẢ THI THỬ
                </div>
                <div className="font-extrabold text-4xl text-custom-green">
                  ĐẠT
                </div>
              </div>
              <div className="flex flex-col text-custom-normal-active-violet italic w-[20%]">
                <div>Đề: {testDesc}</div>
                <div>Hoàn thành: {userCompleteTime}</div>
                <div>
                  Điểm: {userScore}/{testTotalScore}
                </div>
              </div>
              <div className="bg-violet-50 rounded-2xl h-[90px] w-[459px] relative flex justify-center items-start">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className="text-purple hover:text-purple/80 disabled:opacity-50"
                  >
                    <MdKeyboardArrowLeft />
                  </Button>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="text-purple hover:text-purple/80 disabled:opacity-50"
                  >
                    <MdKeyboardArrowRight />
                  </Button>
                </div>
                <ol className="list-none flex flex-wrap gap-[5px] w-[329px] h-[52px] mx-auto select-none mt-2">
                  {currentQuestions.map((ele, index: number) => (
                    <div className="relative" key={index}>
                      <li key={index} className="flex justify-center">
                        <Button
                          onClick={() =>
                            setSelectedQuestion(startIndex + index)
                          }
                          variant="outline"
                          size="icon"
                          className={cn(
                            `
                        w-6 h-6 text-sm
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
                            selectedQuestionIndex === startIndex + index &&
                              'ring-2 ring-purple ring-offset-2 font-bold',
                            !questions[startIndex + index].userAnswerId
                              ? `` // No answer chosen
                              : questions[startIndex + index].userAnswerId ===
                                questions[startIndex + index].answers?.find(
                                  (a) => a.la_lua_chon_dung
                                )?.id
                              ? `bg-custom-ol-green text-white hover:bg-custom-ol-green/70 hover:text-white/90` // Correct answer
                              : `bg-custom-brown text-white hover:bg-custom-brown/70 hover:text-white/90` // Incorrect answer
                          )}
                        >
                          {startIndex + index + 1}
                        </Button>
                      </li>
                    </div>
                  ))}
                </ol>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-purple">
                  {currentPage + 1}/{totalPages}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 h-full">
            <div className="w-[65%] bg-custom-bg-gray flex flex-col justify-start items-center p-5 gap-2">
              <div className="flex justify-between items-center w-full text-lg">
                <div className="relative">
                  <FaArrowLeft
                    onClick={handlePrevious}
                    className="text-purple hover:text-purple/80 cursor-pointer"
                  />
                  {questions[selectedQuestionIndex]?.question
                    ?.la_cau_diem_liet && (
                    <div className="absolute top-[-5px] left-[26px]">
                      <CriticalStar className="text-2xl" displayText={true} />
                    </div>
                  )}
                </div>
                <div className="font-bold text-base select-none">{`Câu hỏi ${
                  selectedQuestionIndex + 1
                }`}</div>
                <FaArrowRight
                  onClick={handleNext}
                  className="text-purple hover:text-purple/80 cursor-pointer"
                />
              </div>
              <div
                className={`${montserratAlternates.className} self-start mb-2 text-sm`}
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
                {Array.from({ length: 4 }).map((_, index) => {
                  const answer =
                    questions[selectedQuestionIndex]?.answers?.[index]
                  const isSelected =
                    questions[selectedQuestionIndex]?.userAnswerId ===
                    answer?.id
                  const isCorrect = answer?.la_lua_chon_dung

                  let bgColor = 'bg-custom-bg-gray' // Default background

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
                        h-[120px]
                      `)}
                    >
                      {answer && (
                        <RadioGroupItem
                          value={`answer-${selectedQuestionIndex}-${index}`}
                          id={`r${selectedQuestionIndex}-${index}`}
                        />
                      )}
                      <div className="text-xs text-neutral-500 font-medium">
                        {answer?.noi_dung_lua_chon || ''}
                      </div>
                    </Label>
                  )
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ResultDetailPage
