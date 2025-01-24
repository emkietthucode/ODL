'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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

const TestComponent = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  const handleClick = (index: number) => {
    setSelectedQuestion(index)
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
          <Button variant="main" className="my-5 hover:bg-purple/90">
            NỘP BÀI
          </Button>
        </div>

        <div className="w-[50%] bg-neutral-200"> div 2</div>
        <div className="w-[30%] bg-neutral-200"> div 2</div>
      </div>
    </div>
  )
}

export default TestComponent
