'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CauHoi, LuaChon } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { toast } from 'react-hot-toast'

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['vietnamese'],
})

interface QuestionDTO {
  question?: CauHoi
  answers?: LuaChon[]
  userAnswerIndex?: string
}

const DEFAULT_TIME = 1 * 60 // 10 minutes in seconds

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TestComponent = () => {
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [selectedQuestionIndex, setSelectedQuestion] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME)
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    new Array(questions.length).fill('')
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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
        answers:
          item.lua_chon[0]?.so_thu_tu === 0
            ? shuffleAnswers(item.lua_chon)
            : item.lua_chon,
        userAnswerIndex: '-1', // Default to -1
      }))

      setQuestions(formattedQuestions)
    }

    fetchQuestions()
  }, [])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  const handleClickQuestion = (index: number) => {
    if (!isTesting) {
      return toast.error('Vui lòng bấm Bắt đầu thi')
    }
    setSelectedQuestion(index)
  }

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newSelectedAnswers = [...questions]
    newSelectedAnswers[questionIndex].userAnswerIndex = value.split('-').pop()
    setQuestions(newSelectedAnswers)
  }

  const handleSubmitButton = () => {
    if (!isTesting && timeLeft === 0) {
      setTimeLeft(DEFAULT_TIME)
    }
    setIsTesting(!isTesting)
    console.log(questions)
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
        BANG A1 - DE SO 1
      </div>
      <div className="h-[560px] w-full flex gap-2">
        <div className="w-[22%] bg-light-purple-admin flex flex-col justify-between items-center">
          <ol className="list-none grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-4">
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
                      'ring-2 ring-purple ring-offset-2 font-extrabold'
                  )}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
          </ol>
          {isTesting ? (
            <Button
              onClick={handleSubmitButton}
              variant="main"
              className="my-5 hover:bg-purple/90"
            >
              NỘP BÀI
            </Button>
          ) : (
            <Button
              onClick={() => setIsTesting(true)}
              variant="main"
              className="my-5 hover:bg-purple/90"
            >
              BẮT ĐẦU THI
            </Button>
          )}
        </div>

        <div className="w-[53%] bg-neutral-200 flex flex-col justify-start items-center p-5 gap-2">
          <div className="flex justify-between items-center w-full text-lg">
            <FaArrowLeft className="text-purple hover:text-purple/80 cursor-pointer" />
            <div className="font-bold">{`Câu hỏi ${
              selectedQuestionIndex + 1
            }:`}</div>
            <FaArrowRight className="text-purple hover:text-purple/80 cursor-pointer" />
          </div>
          <div className={`${montserratAlternates.className} self-start mb-2`}>
            {questions[selectedQuestionIndex]?.question?.noi_dung_cau_hoi}
          </div>
          <Image src={''} alt="" />
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
          >
            {questions[selectedQuestionIndex]?.answers?.map(
              (answer: LuaChon, index: number) => (
                <div
                  key={index}
                  className="grow bg-neutral-200 flex items-start p-2 gap-2"
                >
                  <RadioGroupItem
                    value={`answer-${selectedQuestionIndex}-${index}`}
                    id={`r${selectedQuestionIndex}-${index}`}
                  />
                  <div className="text-sm text-neutral-500 font-medium">
                    {answer.noi_dung_lua_chon}
                  </div>
                </div>
              )
            )}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default TestComponent
