import { LearningQuestionDTO } from '@/types/dto/types'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components//ui/label'

interface QuestionTableProps {
  question?: LearningQuestionDTO
  index: number
  onAnswerChange?: (answerId: string, index: number) => void
}

function QuestionTable({
  question,
  index,
  onAnswerChange,
}: QuestionTableProps) {
  const answered = (question: LearningQuestionDTO, answerId: string) => {
    if (question.cau_tra_loi) {
      const correctAnswer = question.ds_lua_chon.find(
        (answer) => answer.la_lua_chon_dung
      )

      if (answerId === question.cau_tra_loi) {
        if (answerId === correctAnswer?.id) {
          return 'bg-[#E2EEE4]'
        } else {
          return 'bg-[#EED9D3]'
        }
      }

      if (answerId === correctAnswer?.id) {
        return 'bg-[#E2EEE4]'
      }
    }
    return 'bg-[#EDEDED]'
  }

  return (
    <div className="w-[938px] flex gap-2 my-[10px] h-[464px] mx-auto">
      {/* Question info */}
      <div className="w-[530px] bg-[#EDEDED] p-[10px] relative">
        {/* Question header */}
        <div className="w-full relative">
          <div className="absolute w-full flex justify-between items-center">
            <button className="w-[30px] h-[30px] text-purple flex justify-end items-center">
              <FaArrowLeft />
            </button>

            <p className="w-full text-center text-[14px] font-bold">
              Question {index + 1}:
            </p>

            <button className="w-[30px] h-[30px] text-purple flex justify-start items-center">
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Question body */}
        <div className="mt-[49px] px-4">
          <p className="text-[12px]">
            {' '}
            {question?.noi_dung_cau_hoi || 'Question text here'}
          </p>
        </div>

        {/* Quesiton footer */}
        <div className="absolute bottom-[10px] left-[10px]">
          <button
            disabled
            className="disabled:cursor-auto disabled:opacity-35 disabled:border-light-purple disabled:bg-[#F6F4FD]
             cursor-pointer w-[60px] h-[60px] border-2 rounded-[8px] border-light-purple text-center 
             flex justify-center flex-col items-center bg-[#F6F4FD] hover:border-purple hover:bg-light-purple"
          >
            <HiOutlineLightBulb className="w-8 h-8 text-[#979797]" />
            <span className="text-[12px] uppercase text-purple">Hint</span>
          </button>
        </div>
      </div>

      {/* Question selections */}
      <div className="h-full flex flex-col flex-1">
        <RadioGroup
          className="h-full"
          value={question?.cau_tra_loi}
          onValueChange={(value) => onAnswerChange?.(value, index)}
        >
          {question &&
            Array.from({ length: 4 }).map((_, selectionIndex) => (
              <Label
                key={selectionIndex}
                htmlFor={`r`}
                className={`
                      grow 
                      ${answered(
                        question,
                        question?.ds_lua_chon[selectionIndex]?.id || ''
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
                  value={question?.ds_lua_chon[selectionIndex]?.id || ''}
                />
                <div className="text-sm text-neutral-500 font-medium">
                  {question?.ds_lua_chon[selectionIndex]?.noi_dung_lua_chon ||
                    ''}
                </div>
              </Label>
            ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default QuestionTable
