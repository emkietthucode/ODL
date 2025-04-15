'use client'

import QuestionCarousel from '@/components/question-carousel'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

function LearningTestPage() {
  return (
    <div className="w-[960px] mt-12 mx-auto">
      <div className="bg-[#A08CE6] h-9 leading-9 text-center text-[18] font-bold text-white">
        BẰNG A1 - ĐỀ SỐ 1
      </div>
      <div className="my-2 h-80 gap-[10px] flex flex-wrap">
        <div className="w-[164px] bg-[#F1EEFB] h-80">
          <div className=" flex items-start h-full">
            <QuestionCarousel className="!items-start pt-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-center gap-[6px] h-[full] flex-wrap"
                >
                  {Array.from({ length: 25 }).map((_, smallIndex) => (
                    <button
                      key={smallIndex}
                      className={cn(
                        'cursor-pointer w-6 h-6 bg-[#E2DBF7] text-purple rounded-full text-center font-bold',
                        smallIndex === 0 && 'ring ring-purple ring-offset-2'
                      )}
                    >
                      {smallIndex + 1}
                    </button>
                  ))}
                </div>
              ))}
            </QuestionCarousel>
          </div>
        </div>
        <div className="w-[612px] h-full bg-[#EDEDED] p-3">
          <p className="w-full font-bold text-center">Cau hoi 1</p>
          <p className="text-[12px] my-4">
            Phần của đường bộ được sử dụng cho các phương tiện giao thông qua
            lại là gì?
          </p>
        </div>
        <div className="w-[164px] h-full bg-[#E2DBF7]"></div>
      </div>

      <div className="w-full">
        <RadioGroup className="grid grid-cols-2 gap-[10px]">
          {Array.from({ length: 4 }).map((_, selectionIndex) => (
            <Label
              key={selectionIndex}
              htmlFor={`r${selectionIndex}`}
              className={`
                  grow 
                  bg-[#EDEDED]
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
                // disabled={selectionIndex >= question?.ds_lua_chon.length}
                // value={question?.ds_lua_chon[selectionIndex]?.id || ''}
                id={`r${selectionIndex}`}
                value="something"
              />
              <div className="text-sm text-neutral-500 font-medium min-h-[75px] h-full">
                {/* {question?.ds_lua_chon[selectionIndex]?.noi_dung_lua_chon || ''} */}
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default LearningTestPage
