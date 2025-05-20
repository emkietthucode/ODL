'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HangBang, LuaChon } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { LearningQuestionDTO, QuestionDTO } from '@/types/dto/types'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import PathBar from '../../../../../../../public/images/path-bar-no-border.svg'
import Motorbike from '../../../../../../../public/images/motorbike.svg'
import Car from '../../../../../../../public/images/car.svg'
import ToCar from '../../../../../../../public/images/change-to-car.svg'
import { Montserrat_Alternates } from 'next/font/google'

import { cn } from '@/lib/utils'
import QuestionCarousel from '@/components/question-carousel'
import QuestionTable from '@/components/learning-path/question-table'
import FeatureCard from '@/components/feature-card'

import Card1 from '../../../../../../../public/images/f11LearningCardIcon1.svg'
import Card2 from '../../../../../../../public/images/f11LearningCardIcon2.svg'
import Card3 from '../../../../../../../public/images/f11LearningCardIcon3.svg'
import Card4 from '../../../../../../../public/images/f11LearningCardIcon4.svg'
import { useTranslations } from 'next-intl'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const montserratAlter = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat-alter',
})

const cards = [
  {
    title: 'THI THỬ',
    description:
      'Khi bạn  đã sẵn sàng với bài thi thử, hãy bắt đầu ngay với những đề thi bám sát thực tế.',
    icon: Card1,
    to: '/tests',
  },
  {
    title: 'HỌC BIỂN BÁO GIAO THÔNG:',
    description:
      'Cung cấp danh sách biển báo kèm giải thích chi tiết, giúp bạn ghi nhớ nhanh và chính xác.',
    icon: Card2,
    to: '/sign',
  },
  {
    title: 'HỌC LÝ THUYẾT:',
    description:
      'Học và ôn tập những câu hỏi lý thuyết, được phân loại thành từng chương, theo một lộ trình có sẵn.',
    icon: Card3,
    to: '/learning-path',
  },
  {
    title: 'LÀM LẠI NHỮNG CÂU SAI:',
    description:
      'Lưu lại và giúp bạn luyện tập các câu hỏi đã trả lời sai để cải thiện điểm số và nắm chắc kiến thức.',
    icon: Card4,
    to: '/missed-questions',
  },
]

const LearnCriticalPage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 200,
    total: 0,
  })
  const [questions, setQuestions] = useState<LearningQuestionDTO[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)

  const { vehicleType } = useParams<{ vehicleType: string }>()
  const t = useTranslations('CriticalQuestionsPage')
  const router = useRouter()

  const getAnswerBackground = (question: LearningQuestionDTO) => {
    if (question.cau_tra_loi) {
      const correctAnswer = question.ds_lua_chon.find(
        (answer) => answer.la_lua_chon_dung
      )

      if (question.cau_tra_loi === correctAnswer?.id) {
        return 'bg-[#A3C9A8]'
      } else {
        return 'bg-[#C88572]'
      }
    } else {
      return 'bg-light-purple'
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const license = vehicleType === 'car' ? 'b' : 'a1'

        const { data, error } = await supabase.rpc('fetch_critical_questions', {
          license_name: license,
        })

        const formattedQuestions: LearningQuestionDTO[] = data.map(
          (item: any) => ({
            question: item,
            answers: item.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
              ? shuffleAnswers(item.lua_chon)
              : item.lua_chon.sort(
                  (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
                ),
          })
        )

        setPagination((prev) => ({ ...prev, total: data.length }))

        setQuestions(formattedQuestions)
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuestions()
  }, [vehicleType])

  const onAnswerChange = async (answerId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, cau_tra_loi: answerId } : q))
    )
  }

  return (
    <div className="mt-[72px] mx-auto max-w-screen-xl">
      <div className="max-w-screen-lg mx-auto">
        <div className="w-16 h-[3px] bg-custom-normal-active-violet rounded-full"></div>
        <p className="text-2xl font-bold uppercase text-custom-normal-active-violet">
          {t('criticalQuestions')}
        </p>
        <p className="max-w-[505px] text-sm text-custom-normal-active-violet">
          {t('criticalDescription')}
        </p>
      </div>

      <div className="w-full max-w-[940px] h-[70px] mt-10 mx-auto relative bg-light-purple-admin flex">
        <div className="mr-[35px]">
          <Image src={PathBar} alt="Bar" className=" top-0 left-0" />
          <Image
            src={vehicleType === 'car' ? Car : Motorbike}
            alt="Motorbike"
            className={cn(
              'absolute top-1/2 left-[25px] -translate-y-[60%] font-bold text-white text-[18px]',
              vehicleType === 'car' && '-translate-y-[65%]'
            )}
          />
        </div>
        <div className="flex">
          <div className="flex flex-col text-[12px] text-purple h-full justify-between w-[265px] py-3">
            <span className="text-custom-normal-active-violet font-bold text-2xl uppercase">
              {/* {t('progress')}: {lastAnsweredQuestion + 1}/{questions.length} */}
              {vehicleType === 'car' ? t('car') : t('motorbike')}
            </span>
            <span>
              {/* {t('ratio')}: {getCorrectRatio()}% */}
              {t('progress')}: 1/60
            </span>
          </div>
          <div className="py-3">
            <Separator
              orientation="vertical"
              className="bg-purple w-[3px] rounded-full py-3"
            />
          </div>
          {/* Question carousel */}
          <div className="flex-1 w-[400px] relative h-full ml-4">
            <QuestionCarousel className="px-4" initialSlide={0}>
              {Array.from({
                length: Math.ceil(pagination.total / 24),
              }).map((_, bigIndex) => (
                <div
                  key={bigIndex}
                  className="w-full max-w-[380px] flex justify-start flex-wrap gap-[5px] pl-5"
                >
                  {questions
                    .slice(bigIndex * 24, bigIndex * 24 + 24)
                    .map((q, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedQuestion(index + bigIndex * 24)
                        }
                        className={cn(
                          `w-6 h-6 rounded-full text-purple font-bold ${getAnswerBackground(
                            q
                          )} text-center`,
                          index + bigIndex * 24 === selectedQuestion &&
                            'ring ring-purple ring-offset-2',
                          q.cau_tra_loi && 'text-white'
                        )}
                      >
                        {index + 1 + bigIndex * 24}
                      </button>
                    ))}
                </div>
              ))}
            </QuestionCarousel>
          </div>
        </div>
      </div>

      <QuestionTable
        question={questions[selectedQuestion]}
        index={selectedQuestion}
        onAnswerChange={onAnswerChange}
        onQuestionChange={() => {}}
        canGoToQuestion={(index: number) => true}
      />

      <div className="w-[1124px] mx-auto h-[1px] bg-[#C7C7C7] mt-[21px] mb-8"></div>

      <div className="mx-auto max-w-[974px]">
        <div className="flex gap-[46px] items-center">
          <div>
            <p className="text-[#5297CC] uppercase font-medium text-lg">
              {t('seeMore')}
            </p>
            <p className="w-[257px] mt-8">{t('seeMoreDescription')}</p>
          </div>
          <div className="w-[671px] h-[181px] flex">
            <div className="h-full w-[264px] bg-[#E8EEF3] rounded-tl-[16px] rounded-bl-[16px] ">
              <Image
                src={vehicleType === 'car' ? Motorbike : ToCar}
                alt="something"
                className="mx-auto rounded-tl-[16px] rounded-bl-[16px] w-[192px] h-[143px]"
              />
            </div>
            <div className="px-4 pt-4 pb-2 shadow-[3px_6px_4px_2px_rgba(0,0,0,0.04)] rounded-tr-[16px] rounded-br-[16px]">
              <p className="w-full text-xs uppercase text-[#656F77]">
                {t('criticalQuestions')}
              </p>
              <p
                className={`font-bold text-2xl ${montserratAlter.className} mt-2`}
              >
                {t('car')}
              </p>
              <p className="text-sm">{t('carCritical')}</p>

              <div className="text-end">
                <button
                  onClick={() =>
                    router.push(
                      `/learn/vietnam/${
                        vehicleType === 'car' ? 'motorbike' : 'car'
                      }/critical-questions`
                    )
                  }
                  className="bg-[#1814E4] mr-[13px] font-bold rounded-[4px] w-[88px] h-8 text-xs text-white"
                >
                  {t('learnNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1065px] mx-auto mb-[61px]">
        <p className="text-[20px] font-light text-[#7869AD] w-full text-center mt-[46px]">
          {t('otherFeatures')}
        </p>

        <div className="flex gap-10 justify-center mt-8 ">
          <FeatureCard
            title={t('card1Title')}
            description={t('card1Description')}
            icon={Card1}
            to="/tests"
          />

          <FeatureCard
            title={t('card2Title')}
            description={t('card2Description')}
            icon={Card2}
            to="/"
          />

          <FeatureCard
            title={t('card3Title')}
            description={t('card3Description')}
            icon={Card3}
            to="/learning-path"
          />

          <FeatureCard
            title={t('card4Title')}
            description={t('card4Description')}
            icon={Card4}
            to="/missed-questions"
          />
        </div>
      </div>
    </div>
  )
}

export default LearnCriticalPage
