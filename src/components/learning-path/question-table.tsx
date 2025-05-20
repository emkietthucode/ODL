import { LearningQuestionDTO } from '@/types/dto/types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { LuaChon } from '@/types/types'


interface QuestionTableProps {
  question: LearningQuestionDTO
  index: number
  onAnswerChange: (answerId: string, index: number) => void
  onQuestionChange?: (change: number) => void
  canGoToQuestion: (index: number) => boolean
}

function QuestionTable({
  question,
  index,
  onAnswerChange,
  onQuestionChange,
  canGoToQuestion,
}: QuestionTableProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(() => {
    // Initialize state synchronously to avoid stale state issues
    return question?.cau_tra_loi
      ? question.ds_lua_chon.findIndex((c) => c.id === question?.cau_tra_loi)
      : -1
  })
  const [showHint, setShowHint] = useState<boolean>(false)

  const t = useTranslations('LearningPathPage')

  // Update selectedAnswer when question or index changes
  useEffect(() => {
    const selectedIndex = question?.cau_tra_loi
      ? question.ds_lua_chon.findIndex((c) => c.id === question?.cau_tra_loi)
      : -1
    setSelectedAnswer(selectedIndex)
  }, [question, index])

  // Handle answer background color based on correctness
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

  // Handle answer navigation (up/down)
  const changeAnswer = useCallback(
    (change: number) => {
      if (!question.ds_lua_chon.length) return

      setSelectedAnswer((prev) => {
        const maxIndex = question.ds_lua_chon.length - 1
        let newIndex = prev + change

        // Handle wrapping
        if (newIndex < 0) {
          newIndex = maxIndex
        } else if (newIndex > maxIndex) {
          newIndex = 0
        }

        // Update parent state with the new answer
        onAnswerChange(question.ds_lua_chon[newIndex].id, index)
        return newIndex
      })
    },
    [question?.ds_lua_chon, onAnswerChange, index]
  )

  const changeAnswerWithNumber = useCallback(
    (key: number) => {
      if (key - 1 >= question.ds_lua_chon.length) return

      setSelectedAnswer(key - 1)
      onAnswerChange(question.ds_lua_chon[key - 1].id, index)
    },
    [question?.ds_lua_chon, onAnswerChange, index]
  )

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        onQuestionChange?.(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        onQuestionChange?.(1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswer(-1)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswer(1)
      } else if (event.key === '1') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithNumber(1)
      } else if (event.key === '2') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithNumber(2)
      } else if (event.key === '3') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithNumber(3)
      } else if (event.key === '4') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithNumber(4)
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [onQuestionChange, changeAnswer])

  const handleTriggerHint = () => {
    setShowHint((prev) => !prev)
  }

  return (
    <div className="w-[938px] flex gap-2 my-[10px] h-[464px] mx-auto">
      {/* Question info */}
      <div className="w-[530px] bg-[#EDEDED] p-[10px] relative">
        <div className="w-full relative">
          <div className="absolute w-full flex justify-between items-center">
            <button
              disabled={index === 0}
              onClick={() => onQuestionChange?.(-1)}
              className="w-[30px] h-[30px] text-purple flex justify-end items-center disabled:opacity-50"
            >
              <FaArrowLeft />
            </button>
            <p className="w-full text-center text-[14px] font-bold">
              {t('question')} {index + 1}:
            </p>
            <button
              disabled={!canGoToQuestion(index + 1)}
              onClick={() => onQuestionChange?.(1)}
              className="w-[30px] h-[30px] text-purple flex justify-start items-center disabled:opacity-50"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="mt-[49px] px-4">
          <p className="text-[12px]">
            {question?.noi_dung_cau_hoi || 'Question text here'}
          </p>
        </div>
        <div
          className={cn(
            'absolute bottom-[10px] left-1/2 -translate-x-1/2 rounded-[8px] w-[481px] p-[1px] flex items-center',
            showHint && 'bg-light-purple'
          )}
        >
          <button
            onClick={handleTriggerHint}
            disabled={!question?.goi_y}
            className="disabled:cursor-auto disabled:opacity-35 disabled:border-light-purple disabled:bg-[#F6F4FD]
               cursor-pointer w-[60px] h-[60px] border-2 rounded-[8px] border-light-purple text-center
               flex justify-center flex-col items-center bg-[#F6F4FD] hover:border-purple hover:bg-light-purple"
          >
            <HiOutlineLightBulb
              className={cn(
                'w-8 h-8 text-[#979797]',
                showHint && 'fill-yellow-300 text-yellow-300'
              )}
            />
            <p className="text-[12px] w-full  uppercase text-purple">Hint</p>
          </button>
          {showHint && (
            <p className="px-3 max-w-[400px] text-sm">
              Some hint for your question, hope it can make you make your
              decision
            </p>
          )}
        </div>
      </div>

      {/* Question selections */}
      <div className="h-full flex flex-col flex-1">
        <RadioGroup
          className="h-full"
          value={question?.cau_tra_loi}
          onValueChange={(value) => onAnswerChange(value, index)}
        >
          {question &&
            question?.ds_lua_chon.map((_, selectionIndex) => (
              <Label
                key={selectionIndex}
                htmlFor={`r${selectionIndex}`}
                className={cn(
                  `
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
                  duration-150
                  font-medium
                   text-sm text-neutral-500
                  `,
                  question?.ds_lua_chon[selectionIndex]?.id ===
                    question?.cau_tra_loi && 'font-semibold text-black'
                )}
              >
                <RadioGroupItem
                  disabled={selectionIndex >= question?.ds_lua_chon.length}
                  value={question?.ds_lua_chon[selectionIndex]?.id || ''}
                  id={`r${selectionIndex}`}
                />

                {question?.ds_lua_chon[selectionIndex]?.noi_dung_lua_chon || ''}
              </Label>
            ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default QuestionTable
