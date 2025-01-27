'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const montserratAlternates = Montserrat_Alternates({
  weight: '500',
  subsets: ['vietnamese'],
})

const questions = [
  'What is your favorite color?',
  'How old are you?',
  'What is your profession?',
  'Where do you live?',
  'What are your hobbies?',
  'What are your hobbies?',
  'What are your hobbies?',
  'What are your hobbies?',
  'What are your hobbies?',
  'What are your hobbies?',
  'What are your hobbies?',
]

const DEFAULT_TIME = 1 * 60 // 10 minutes in seconds

const TestComponent = () => {
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTesting && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsTesting(false)
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTesting, timeLeft])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  const handleClick = (index: number) => {
    setSelectedQuestion(index)
  }

  const handleSubmit = () => {
    if (!isTesting && timeLeft === 0) {
      setTimeLeft(DEFAULT_TIME)
    }
    setIsTesting(!isTesting)
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
            {questions.map((question, index: number) => (
              <li key={index} className="flex justify-center">
                <Button
                  onClick={() => handleClick(index)}
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
                    selectedQuestion === index &&
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
              onClick={handleSubmit}
              variant="main"
              className="my-5 hover:bg-purple/90"
            >
              NỘP BÀI
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
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
            <div className="font-bold">Câu hỏi 2:</div>
            <FaArrowRight className="text-purple hover:text-purple/80 cursor-pointer" />
          </div>
          <div className={`${montserratAlternates.className} self-start mb-2`}>
            Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?
          </div>
          <Image src={''} alt="" />
        </div>
        <div className="w-[25%] flex flex-col h-full gap-3">
          <div className="grow-[0.2] bg-light-purple text-purple font-bold text-3xl flex items-center justify-center">
            {formatTime(timeLeft)}
          </div>
          <RadioGroup className="grow" defaultValue="comfortable">
            <div className="grow bg-neutral-200 flex items-start p-2 gap-2">
              <RadioGroupItem value="answer-1" id="r1" />
              <div className="text-sm  text-neutral-500 font-medium">
                Phần mặt đường và lề đường đường.
              </div>
            </div>
            <div className="grow bg-neutral-200 flex items-start p-2 gap-2">
              <RadioGroupItem value="answer-2" id="r2" />
              <div className="text-sm  text-neutral-500 font-medium">
                Phần mặt đường và lề đường đường.
              </div>
            </div>
            <div className="grow bg-neutral-200 flex items-start p-2 gap-2">
              <RadioGroupItem value="answer-3" id="r3" />
              <div className="text-sm  text-neutral-500 font-medium">
                Phần mặt đường và lề đường đường.
              </div>
            </div>
            <div className="grow bg-neutral-200 flex items-start p-2 gap-2">
              <RadioGroupItem value="answer-4" id="r4" />
              <div className="text-sm  text-neutral-500 font-medium">
                Phần mặt đường và lề đường đường.
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

export default TestComponent
