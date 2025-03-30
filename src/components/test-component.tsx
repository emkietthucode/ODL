'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LuaChon } from '@/types/types'
import { toast } from 'react-hot-toast'
import { QuestionDTO } from '@/types/dto/types'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { Label } from '@/components//ui/label'
import { useTranslations } from 'next-intl'
import { BsFlag, BsFlagFill } from 'react-icons/bs'
import supabase from '@/utils/supabase/supabase'

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['vietnamese'],
})

const DEFAULT_TIME = 10 * 60 // 10 minutes in seconds

interface TestComponentProps {
  title: string
  testDurationMinutes?: number
  questions: QuestionDTO[]
  setQuestions: (questions: QuestionDTO[]) => void
}

const TestComponent: React.FC<TestComponentProps> = ({
  title = '',
  testDurationMinutes = DEFAULT_TIME,
  questions,
  setQuestions,
}) => {
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [selectedQuestionIndex, setSelectedQuestion] = useState<number>(0)
  const [flagQuestion, setFlagQuestion] = useState<boolean>(false)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  )
  const [timeLeft, setTimeLeft] = useState(testDurationMinutes)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { onOpen, setTestCompletionTimeSec } = useConfirmSubmitTestModal()
  const t = useTranslations('TestPage')

  // Timer Logic
  useEffect(() => {
    if (isTesting && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }

    if (timeLeft === 0) {
      setIsTesting(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isTesting, timeLeft])

  if (!questions) {
    return null
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  const showTestMessage = (isTesting: boolean, timeLeft: number) => {
    if (!isTesting) {
      const message =
        timeLeft > 0 ? 'Vui lòng bấm Bắt đầu thi' : 'Đã hết thời gian thi'
      return message
    }
    return null
  }

  const handleClickQuestion = (index: number) => {
    const message = showTestMessage(isTesting, timeLeft)
    if (message) {
      return toast.error(message)
    }
    setSelectedQuestion(index)
  }

  const handlePrevious = () => {
    const message = showTestMessage(isTesting, timeLeft)
    if (message) {
      return toast.error(message)
    }
    if (selectedQuestionIndex > 0) {
      setSelectedQuestion((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    const message = showTestMessage(isTesting, timeLeft)
    if (message) {
      return toast.error(message)
    }
    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestion((prev) => prev + 1)
    }
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const message = showTestMessage(isTesting, timeLeft)
    if (message) {
      return toast.error(message)
    }
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
  }

  const handleOnClickRadioGroupItem = () => {
    const message = showTestMessage(isTesting, timeLeft)
    if (message) {
      return toast.error(message)
    }
  }

  const getQuestionImg = async (imgId: string) => {
    if (!imgId) return ''
    const { data } = supabase.storage
      .from('hinh_anh_cau_hoi')
      .getPublicUrl(imgId)

    if (!data?.publicUrl) return ''

    try {
      const response = await fetch(data.publicUrl, { method: 'HEAD' }) // Ping the URL
      if (!response.ok) return ''
      return data.publicUrl
    } catch (error) {
      console.error('Error checking image URL:', error)
      return ''
    }
  }

  const [imgSrc, setImgSrc] = useState<string>('')

  useEffect(() => {
    const loadImage = async () => {
      const src = await getQuestionImg(
        questions[selectedQuestionIndex]?.question?.id || ''
      )
      setImgSrc(src)
    }
    loadImage()
  }, [selectedQuestionIndex, questions])

  const handleSubmitButton = () => {
    if (!isTesting && timeLeft === 0) {
      setTimeLeft(testDurationMinutes)
    }
    setIsTesting(false)
    setTestCompletionTimeSec(testDurationMinutes - timeLeft)
    onOpen(() => {
      setIsTesting(true)
    })
  }

  const handleStartTheTest = () => {
    setHasStarted(true)
    setIsTesting(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Always handle arrow keys for question navigation, regardless of focus
      if (event.key === 'ArrowLeft') {
        event.preventDefault() // Prevent default radio group behavior
        event.stopPropagation() // Stop event from reaching radio group
        handlePrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        handleNext()
      } else if (event.key === 'Enter') {
        if (hasStarted) {
          handleSubmitButton()
        } else {
          handleStartTheTest()
        }
      }
    }

    // Capture phase ensures our handler runs before the radio group's handler
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [
    selectedQuestionIndex,
    handleNext,
    handlePrevious,
    handleSubmitButton,
    handleStartTheTest,
    hasStarted,
  ])

  const handleFlagQuestion = () => {
    setFlagQuestion((prev) => !prev)
  }

  return (
    <div className="flex flex-col gap-10 my-10 w-[71%]">
      <div
        className="
          w-full 
          h-[50px] 
          bg-purple 
          text-white 
          text-center 
          font-semibold 
          text-xl
          flex justify-center items-center
          "
      >
        {`${title}`}
      </div>

      <div className="h-[600px] w-full flex gap-2">
        <div className="w-[22%] bg-light-purple-admin flex flex-col justify-between items-center">
          <ol className="list-none grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 p-4">
            {questions.map((_, index: number) => (
              <li key={index} className="flex justify-center">
                <Button
                  onClick={() => handleClickQuestion(index)}
                  variant="outline"
                  size="icon"
                  className={cn(
                    `
                  w-2 h-2 text-[6px]
                  sm:w-4 sm:h-4 sm:text-[9px]  
                  lg:w-6 lg:h-6 lg: lg:text-sm  
                  xl:w-7 xl:h-7 lg: xl:text-sm  
                  font-bold 
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
                      'ring-2 ring-purple ring-offset-2 font-extrabold',
                    questions[index].userAnswerId &&
                      `bg-neutral-300 
                      text-neutral-500 
                      hover:bg-neutral-300/70 
                      hover:text-neutral-500/90`
                  )}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
          </ol>
          {!hasStarted ? (
            <Button
              onClick={handleStartTheTest}
              variant="main"
              className="my-5 hover:bg-purple/90"
            >
              {t('startButton')}
            </Button>
          ) : (
            <Button
              onClick={handleSubmitButton}
              variant="main"
              className="my-5 hover:bg-purple/90"
            >
              {t('submitButton')}
            </Button>
          )}
        </div>

        <div className="w-[53%] bg-neutral-200 flex flex-col justify-start items-center p-5 gap-2">
          <div className="flex justify-between items-center w-full text-lg">
            <FaArrowLeft
              onClick={handlePrevious}
              className="text-purple hover:text-purple/80 cursor-pointer"
            />
            <div className="flex gap-2 justify-center items-center select-none">
              <div className="font-bold">{`Câu hỏi ${
                selectedQuestionIndex + 1
              }:`}</div>
              {flagQuestion ? (
                <BsFlagFill
                  className="text-2xl cursor-pointer"
                  onClick={handleFlagQuestion}
                  color="yellow"
                />
              ) : (
                <BsFlag
                  className="text-2xl cursor-pointer"
                  onClick={handleFlagQuestion}
                />
              )}
            </div>
            <FaArrowRight
              onClick={handleNext}
              className="text-purple hover:text-purple/80 cursor-pointer"
            />
          </div>
          <div
            className={`${montserratAlternates.className} self-start mb-2 ${
              !isTesting && 'blur-sm select-none'
            }`}
          >
            {questions[selectedQuestionIndex]?.question?.noi_dung_cau_hoi}
          </div>
          {imgSrc && (
            <Image width={300} height={200} src={imgSrc} alt="Question Image" />
          )}
        </div>
        <div className="w-[25%] flex flex-col h-full gap-3">
          <div className="h-[86px] bg-light-purple text-purple font-bold text-3xl flex items-center justify-center">
            {formatTime(timeLeft)}
          </div>
          <RadioGroup
            value={selectedAnswers[selectedQuestionIndex]}
            onValueChange={(value) =>
              handleAnswerChange(selectedQuestionIndex, value)
            }
            className="h-full"
            disabled={showTestMessage(isTesting, timeLeft) ? true : false}
            onClick={handleOnClickRadioGroupItem}
          >
            {questions[selectedQuestionIndex]?.answers?.map(
              (answer: LuaChon, index: number) => (
                <Label
                  key={index}
                  htmlFor={`r${selectedQuestionIndex}-${index}`}
                  className="
                  grow 
                  bg-neutral-200 
                  flex 
                  items-start 
                  p-3 
                  gap-2 
                  cursor-pointer
                  rounded-lg 
                  border
                  border-transparent 
                hover:bg-neutral-300
                active:bg-neutral-400
                  active:scale-80
                  transition-all 
                  duration-150"
                >
                  <RadioGroupItem
                    value={`answer-${selectedQuestionIndex}-${index}`}
                    id={`r${selectedQuestionIndex}-${index}`}
                  />
                  <div
                    className={`text-sm text-neutral-500 font-medium select-none ${
                      !isTesting && 'blur-sm'
                    }`}
                  >
                    {answer.noi_dung_lua_chon}
                  </div>
                </Label>
              )
            )}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default TestComponent
