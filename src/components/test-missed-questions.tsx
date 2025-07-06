'use client'

import QuestionCarousel from '@/components/question-carousel'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { LearningQuestionDTO, QuestionDTO } from '@/types/dto/types'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import supabase from '@/utils/supabase/supabase'
import Timer from '@/components/timer-v2'
import useAuth from '@/hooks/useAuth'
import { useTranslations } from 'next-intl'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { Button } from './ui/button'

const convertLearningQuestionsToQuestionDTO = (
  learningQuestions: LearningQuestionDTO[]
): QuestionDTO[] => {
  return learningQuestions.map((q) => ({
    question: {
      id: q.id,
      noi_dung_cau_hoi: q.noi_dung_cau_hoi,
      hinh_anh: q.hinh_anh?.toString() || '',
      giai_thich: q.giai_thich || '',
      goi_y: q.goi_y?.map((lc) => lc.noi_dung_lua_chon).join(', ') || '',
      la_cau_diem_liet: false,
      ma_chuong: '',
      loai_cau_hoi: '',
      created_at: new Date(),
      updated_at: new Date(),
    },
    answers: q.ds_lua_chon,
    userAnswerId: q.cau_tra_loi,
  }))
}

// Function to get optimized image URL
const getOptimizedImageUrl = (imageName: string, width: number = 370) => {
  if (!imageName) return ''

  // Use Supabase transformations for better performance
  return `https://cgtsomijxwpcyqgznjqx.supabase.co/storage/v1/object/public/hinh_anh_cau_hoi/${imageName}?width=${width}&quality=80`
}

const TestMissedQuestions = () => {
  const {
    onOpen,
    setQuestions: setQuestionsForDetail,
    setTestCompletionTimeSec,
  } = useConfirmSubmitTestModal()
  const { testId } = useParams<{ testId: string }>()
  const [questions, setQuestions] = useState<LearningQuestionDTO[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(true)
  const { user } = useAuth()
  const t = useTranslations('LearningTestPage')
  const [currentTimeLeft, setCurrentTimeLeft] = useState(0)
  const [testInfo, setTestInfo] = useState<{
    thoi_gian_lam_bai: number
    ten_de_thi: string
  } | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<number, boolean>
  >({})
  const [timeUp, setTimeUp] = useState<boolean>(false)

  useEffect(() => {
    const handleFetchData = async () => {
      setIsActive(false)
      try {
        const { data: cauHoiThuongSaiList, error: error1 } = await supabase
          .from('cau_hoi_thuong_sai')
          .select('cau_hoi_id, duoc_danh_dau')
          .eq('nguoi_dung_id', user?.id)

        if (error1) {
          console.log('error1: ', error1)
          return
        }

        const cauHoiIds =
          cauHoiThuongSaiList?.map((item) => item.cau_hoi_id) || []

        const { data: cauHoiList, error: error2 } = await supabase
          .from('cau_hoi')
          .select(
            'id, noi_dung_cau_hoi, ma_chuong, hinh_anh, lua_chon(id, noi_dung_lua_chon, la_lua_chon_dung, so_thu_tu)'
          )
          .in('id', cauHoiIds)

        if (error2) {
          console.log('error2', error2)
          return
        }

        const questionsData: LearningQuestionDTO[] = (cauHoiList || []).map(
          (cauHoi: any) => ({
            id: cauHoi.id,
            noi_dung_cau_hoi: cauHoi.noi_dung_cau_hoi,
            ds_lua_chon: (cauHoi.lua_chon || []).map((luaChon: any) => ({
              id: luaChon.id,
              noi_dung_lua_chon: luaChon.noi_dung_lua_chon,
              la_lua_chon_dung: luaChon.la_lua_chon_dung,
              ma_cau_hoi: cauHoi.id, // you can assign cauHoi.id here
              so_thu_tu: luaChon.so_thu_tu,
            })),
            cau_tra_loi: '',
            giai_thich: '',
            goi_y: [],
            hinh_anh: cauHoi.hinh_anh || '',
          })
        )

        setQuestions(questionsData as LearningQuestionDTO[])
        setQuestionsForDetail(
          convertLearningQuestionsToQuestionDTO(questionsData)
        )
        setTestInfo({
          thoi_gian_lam_bai: 20,
          ten_de_thi: 'CÂU HỎI THƯỜNG SAI',
        })
        setCurrentTimeLeft(20 * 60)
        setIsActive(true)
      } catch (error: any) {
        console.log('error', error.message)
      }
    }
    if (user?.id == null) return
    handleFetchData()
  }, [testId, user?.id])

  useEffect(() => {
    const handleModalClose = () => {
      setIsActive(true)
    }

    if (!isActive) {
      handleModalClose()
    }
  }, [isActive])

  const getButtonCss = (index: number) => {
    if (questions[index]?.cau_tra_loi) {
      return 'bg-[#907ECF] text-white'
    } else {
      return 'bg-[#E2DBF7] text-purple'
    }
  }

  const handleAnswerChange = (value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[selectedQuestion].cau_tra_loi = value
    setQuestions(updatedQuestions)
    setQuestionsForDetail(
      convertLearningQuestionsToQuestionDTO(updatedQuestions)
    )
  }

  const handleChangeQuestion = (change: number) => {
    const changed = selectedQuestion + change

    if (changed < 0 || changed >= questions.length) {
      return
    }

    setSelectedQuestion(changed)
  }

  const changeAnswerWithIndex = (index: number) => {
    if (
      index - 1 < 0 ||
      index - 1 >= questions[selectedQuestion].ds_lua_chon.length
    ) {
      return
    }

    const selectedAnswer = questions[selectedQuestion].ds_lua_chon[index - 1].id
    handleAnswerChange(selectedAnswer)
  }

  const changeAnswerByArrow = (change: number) => {
    const initialIndex = questions[selectedQuestion].ds_lua_chon.findIndex(
      (q) => q.id === questions[selectedQuestion].cau_tra_loi
    )

    let newIndex = initialIndex + change
    if (newIndex < 0) {
      newIndex = questions[selectedQuestion].ds_lua_chon.length - 1
    } else if (newIndex >= questions[selectedQuestion].ds_lua_chon.length) {
      newIndex = 0
    }

    const selectedAnswer = questions[selectedQuestion].ds_lua_chon[newIndex].id
    handleAnswerChange(selectedAnswer)
  }

  const handleSubmit = (time: number) => {
    setTestCompletionTimeSec(time)
  }

  const handleTimeUp = () => {
    setTimeUp(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isActive) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        handleChangeQuestion(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        handleChangeQuestion?.(1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerByArrow(-1)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerByArrow(1)
      } else if (event.key === '1') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithIndex(1)
      } else if (event.key === '2') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithIndex(2)
      } else if (event.key === '3') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithIndex(3)
      } else if (event.key === '4') {
        event.preventDefault()
        event.stopPropagation()
        changeAnswerWithIndex(4)
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [handleChangeQuestion, changeAnswerWithIndex, changeAnswerByArrow])

  // Preload images function
  const preloadImage = (imageUrl: string) => {
    if (preloadedImages.has(imageUrl)) return

    const img = new Image()
    img.onload = () => {
      setPreloadedImages((prev) => new Set(prev).add(imageUrl))
    }
    img.src = imageUrl
  }

  // Handle image load state
  const handleImageLoad = (questionIndex: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [questionIndex]: false }))
  }

  const handleImageError = (questionIndex: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [questionIndex]: false }))
  }

  // Set loading state when question changes
  useEffect(() => {
    if (questions[selectedQuestion]?.hinh_anh) {
      setImageLoadingStates((prev) => ({ ...prev, [selectedQuestion]: true }))
    }
  }, [selectedQuestion, questions])

  // Preload next few images when question changes
  useEffect(() => {
    if (questions.length === 0) return

    // Preload current image
    if (questions[selectedQuestion]?.hinh_anh) {
      preloadImage(getOptimizedImageUrl(questions[selectedQuestion].hinh_anh))
    }

    // Preload next 2 images
    for (let i = 1; i <= 2; i++) {
      const nextIndex = selectedQuestion + i
      if (nextIndex < questions.length && questions[nextIndex]?.hinh_anh) {
        preloadImage(getOptimizedImageUrl(questions[nextIndex].hinh_anh))
      }
    }

    // Preload previous image
    const prevIndex = selectedQuestion - 1
    if (prevIndex >= 0 && questions[prevIndex]?.hinh_anh) {
      preloadImage(getOptimizedImageUrl(questions[prevIndex].hinh_anh))
    }
  }, [selectedQuestion, questions])

  return (
    <div className="w-[960px] mx-auto my-10">
      <div className="bg-[#A08CE6] h-9 leading-9 text-center text-[18] font-bold text-white">
        CÂU HỎI THƯỜNG SAI
      </div>
      <div className="my-2 h-80 gap-[10px] flex flex-wrap">
        <div className="w-[164px] bg-[#F1EEFB] h-80">
          <div className=" flex items-start h-full relative">
            <QuestionCarousel
              totalSlide={Math.ceil(questions.length / 25)}
              className="!items-start pt-3"
              secondary
            >
              {Array.from({ length: Math.ceil(questions.length / 25) }).map(
                (_, groupIndex) => {
                  const startIndex = groupIndex * 25
                  const endIndex = Math.min(startIndex + 25, questions.length)
                  const questionsInThisGroup = endIndex - startIndex

                  return (
                    <div
                      key={groupIndex}
                      className="flex justify-center gap-[6px] h-[full] flex-wrap"
                    >
                      {Array.from({ length: questionsInThisGroup }).map(
                        (_, qIndex) => {
                          const questionIndex = startIndex + qIndex
                          return (
                            <button
                              key={questionIndex}
                              disabled={!isActive}
                              onClick={() => setSelectedQuestion(questionIndex)}
                              className={cn(
                                `cursor-pointer w-6 h-6 ${getButtonCss(
                                  questionIndex
                                )}  rounded-full text-center font-bold disabled:opacity-50`,
                                questionIndex === selectedQuestion &&
                                  'ring ring-purple ring-offset-2'
                              )}
                            >
                              {questionIndex + 1}
                            </button>
                          )
                        }
                      )}
                    </div>
                  )
                }
              )}
            </QuestionCarousel>
          </div>
        </div>
        <div className="w-[612px] h-full bg-[#EDEDED] p-3">
          <p className="w-full font-bold text-center">
            {t('question')} {selectedQuestion + 1}
          </p>
          <p className="text-[12px] my-4">
            {questions[selectedQuestion]?.noi_dung_cau_hoi || ''}
          </p>
          {questions[selectedQuestion]?.hinh_anh && (
            <div className="mx-auto mt-4">
              {imageLoadingStates[selectedQuestion] && (
                <div className="max-w-[370px] mx-auto h-48 bg-gray-200 animate-pulse rounded flex items-center justify-center">
                  <div className="text-gray-500">Loading...</div>
                </div>
              )}
              <img
                className={cn(
                  'max-w-[370px] max-h-[200px] mx-auto',
                  imageLoadingStates[selectedQuestion] && 'hidden'
                )}
                src={getOptimizedImageUrl(
                  questions[selectedQuestion]?.hinh_anh
                )}
                alt="image"
                onLoad={() => handleImageLoad(selectedQuestion)}
                onError={() => handleImageError(selectedQuestion)}
                loading="eager"
              />
            </div>
          )}
        </div>
        <div className="w-[164px] h-full bg-[#F1EEFB] py-3 flex flex-col justify-between">
          <div className="mx-auto w-[106px] h-[47px] font-bold bg-light-purple text-center leading-[47px] rounded-[8px] text-[28px] text-purple">
            <Timer
              time={
                testInfo?.thoi_gian_lam_bai
                  ? testInfo?.thoi_gian_lam_bai * 60
                  : 0
              }
              isActive={isActive}
              onTimeUp={() => handleTimeUp()}
              onTimeChange={setCurrentTimeLeft}
            />
          </div>

          {timeUp ? (
            <Link href={`${pathname}/detail`} className="flex justify-center">
              <Button
                disabled={true}
                className="disabled:opacity-50 rounded-[5px] opacity-80 mx-auto w-[124px] h-10 text-white text-xl font-bold uppercase bg-purple text-center"
              >
                {t('submit')}
              </Button>
            </Link>
          ) : (
            <Link href={`${pathname}/detail`} className="flex justify-center">
              <Button
                onClick={() => handleSubmit(currentTimeLeft)}
                disabled={!isActive}
                className="disabled:opacity-50 rounded-[5px] opacity-80 mx-auto w-[124px] h-10 text-white text-xl font-bold uppercase bg-purple text-center"
              >
                {t('submit')}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full">
        <RadioGroup
          value={questions[selectedQuestion]?.cau_tra_loi || ''}
          onValueChange={handleAnswerChange}
          className="grid grid-cols-2 gap-[10px]"
        >
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
                disabled={
                  selectionIndex >=
                    questions[selectedQuestion]?.ds_lua_chon?.length ||
                  !isActive
                }
                value={
                  questions[selectedQuestion]?.ds_lua_chon[selectionIndex]
                    ?.id || 'undefined'
                }
                id={`r${selectionIndex}`}
              />
              <div className="text-sm text-neutral-500 font-medium min-h-[75px] h-full">
                {questions[selectedQuestion]?.ds_lua_chon[selectionIndex]
                  ?.noi_dung_lua_chon || ''}
              </div>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default TestMissedQuestions
