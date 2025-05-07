import { QuestionDTO } from '@/types/dto/types'
import { LuaChon } from '@/types/types'
import { useState, useEffect, useRef } from 'react'
import { Montserrat_Alternates } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components//ui/label'
import { chunk } from 'lodash'
import QuestionCarousel from './question-carousel'
import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { LockKeyhole } from 'lucide-react'

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['vietnamese'],
})

interface LearningPathComponentProps {
  initialQuestions: QuestionDTO[]
  initialAnswers: string[]
}

function LearningPathComponent({
  initialQuestions,
  initialAnswers,
}: LearningPathComponentProps) {
  const [questions, setQuestions] = useState<QuestionDTO[]>(initialQuestions)
  const [selectedQuestionIndex, setSelectedQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] =
    useState<string[]>(initialAnswers)
  const { user } = useAuth()

  useEffect(() => {
    setSelectedAnswers([
      ...initialQuestions.map((q, index) =>
        q.userAnswerId
          ? `answer-${index}-${q.answers?.findIndex(
              (t) => t.id === q.userAnswerId
            )}`
          : 'temp'
      ),
    ])
  }, [initialQuestions])

  useEffect(() => {
    setQuestions(initialQuestions)
    setSelectedQuestion(0)
  }, [initialQuestions])

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

  const handleAnswerChange = async (questionIndex: number, value: string) => {
    // Parse the answer index from the value
    const answerIndex = parseInt(value.split('-').pop() || '', 10)

    // Ensure the answerIndex is a valid number
    if (isNaN(answerIndex)) {
      console.error('Invalid answer index:', value)
      return
    }

    // Safely get the selected answer
    const selectedAnswer = questions[questionIndex]?.answers?.[answerIndex].id
    if (!selectedAnswer) {
      console.error(
        'Selected answer not found for question index:',
        questionIndex
      )
      return
    }

    // Update the selected answer index for the specific question
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          userAnswerId: String(selectedAnswer),
        }
      }
      return question
    })

    // Update the state
    setQuestions(updatedQuestions)

    // Update user selected answer
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[questionIndex] = value
      return newAnswers
    })

    const { data, error } = await supabase.rpc('update_user_answers', {
      user_id: user?.id,
      question_id: questions[questionIndex].question?.id,
      answer_id: questions[questionIndex].answers?.[answerIndex].id,
    })

    if (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Always handle arrow keys for question navigation, regardless of focus
      if (event.key === 'ArrowLeft' && selectedQuestionIndex > 0) {
        event.preventDefault() // Prevent default radio group behavior
        event.stopPropagation() // Stop event from reaching radio group
        handlePrevious()
      } else if (event.key === 'ArrowRight' && !canGoToNextQuestion()) {
        event.preventDefault()
        event.stopPropagation()
        handleNext()
      }
    }

    // Capture phase ensures our handler runs before the radio group's handler
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [selectedQuestionIndex, handleNext, handlePrevious])

  const getBackgroundColor = (answer: LuaChon, index: number) => {
    const isSelected =
      selectedAnswers[selectedQuestionIndex] ===
      `answer-${selectedQuestionIndex}-${index}`

    if (!isSelected) {
      return 'bg-neutral-200'
    }

    return answer.la_lua_chon_dung
      ? 'bg-custom-ol-green/70 hover:bg-custom-ol-green/50'
      : 'bg-custom-brown/70 hover:bg-custom-brown/50'
  }

  const getQuestionImg = (imgId: string) => {
    return ''
  }

  const isQuestionLocked = (question: QuestionDTO, index: number) => {
    return (
      index !== 0 &&
      index >
        selectedAnswers.findLastIndex(
          (a) => a !== 'undefined' && a !== 'temp'
        ) +
          1 &&
      !selectedAnswers.includes(question.question?.id || 'undefined')
    )
  }

  const canGoToNextQuestion = () => {
    const lastIndex = selectedAnswers.findLastIndex((q) => q !== 'temp')
    return selectedQuestionIndex > lastIndex
  }

  const chunkedQuestions = chunk(questions, 25)

  const carouselRef = useRef<{ goToFirstSlide: () => void } | null>(null)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goToFirstSlide()
    }
  }, [chunkedQuestions])

  return (
    <div className="flex flex-col gap-10 my-10 w-[71%]">
      <div className="h-[600px] w-full flex gap-2">
        <div className="w-[22%] bg-light-purple-admin flex flex-col justify-between items-center">
          <QuestionCarousel ref={carouselRef} isLastSlide={10}>
            {chunkedQuestions.map((questionGroup, groupIndex) => (
              <ul
                key={groupIndex}
                className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 p-4"
              >
                {questionGroup.map((_, index) => {
                  const actualIndex = groupIndex * 25 + index // Get actual index in full questions array
                  const isLocked = isQuestionLocked(
                    questions[actualIndex],
                    actualIndex
                  )

                  return (
                    <li key={actualIndex} className="flex justify-center">
                      <Button
                        onClick={() => setSelectedQuestion(actualIndex)}
                        disabled={isLocked}
                        variant="outline"
                        size="icon"
                        className={cn(
                          `
                          relative
                   text-[6px]
                  sm:w-4 sm:h-4 sm:text-[9px]  
                  lg:w-6 lg:h-6 lg:text-sm  
                   xl:text-xs  
                  font-bold 
                  rounded-full 
                  px-2 m-0 
                  text-purple 
                  bg-light-purple
                  hover:bg-light-purple/70 
                  hover:text-purple/70
                  transition-all
                  border-separate"
                    `,
                          selectedQuestionIndex === actualIndex &&
                            'ring-2 ring-purple ring-offset-2 font-bold',
                          !questions[actualIndex].userAnswerId
                            ? '' // No answer chosen
                            : questions[actualIndex].userAnswerId ===
                              questions[actualIndex].answers?.find(
                                (a) => a.la_lua_chon_dung
                              )?.id
                            ? `bg-custom-ol-green text-white hover:bg-custom-ol-green/70 hover:text-white/90` // Correct answer
                            : `bg-custom-brown text-white hover:bg-custom-brown/70 hover:text-white/90` // Incorrect answer
                        )}
                      >
                        {isLocked && (
                          <span className="block absolute -top-1 -right-1">
                            <LockKeyhole className="!w-3 !h-3" />
                          </span>
                        )}
                        {actualIndex + 1}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            ))}
          </QuestionCarousel>
        </div>
        <div className="w-[88%] flex flex-col gap-2">
          <div className="flex w-full h-full gap-2">
            <div className="w-[64%] bg-neutral-200 flex flex-col justify-start items-center p-5 gap-2">
              <div className="flex justify-between items-center w-full text-lg">
                <button
                  onClick={handlePrevious}
                  disabled={selectedQuestionIndex === 0}
                  className="disabled:cursor-auto disabled:opacity-30"
                >
                  <FaArrowLeft className="text-purple hover:text-purple/80" />
                </button>
                <div className="font-bold">{`Câu hỏi ${
                  selectedQuestionIndex + 1
                }:`}</div>
                <button
                  onClick={handleNext}
                  disabled={canGoToNextQuestion()}
                  className="disabled:cursor-auto disabled:opacity-30"
                >
                  <FaArrowRight className="text-purple hover:text-purple/80" />
                </button>
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
            <div className="w-[36%] flex flex-col h-full gap-3">
              <RadioGroup
                value={selectedAnswers[selectedQuestionIndex]}
                onValueChange={(value) =>
                  handleAnswerChange(selectedQuestionIndex, value)
                }
                className="h-full"
              >
                {questions[selectedQuestionIndex]?.answers?.map(
                  (answer: LuaChon, index: number) => {
                    return (
                      <Label
                        key={index}
                        htmlFor={`r${selectedQuestionIndex}-${index}`}
                        className={`
                      grow 
                      ${getBackgroundColor(answer, index)}
                      flex 
                      items-start 
                      p-3 
                      gap-2 
                      cursor-pointer
                      rounded-lg 
                      border
                      border-transparent 
                      active:scale-80
                      transition-all 
                      duration-150`}
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
          <div className="bg-neutral-200 w-full h-[10%] flex items-center">
            <div
              className="
            flex justify-center items-center ml-5 p-2
          bg-purple rounded-lg w-[100px] h-[37px] text-sm font-medium text-white"
            >
              GIẢI THÍCH:{' '}
              {questions[selectedQuestionIndex]?.question?.giai_thich}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningPathComponent
