'use client'

import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PathBar from '../../../../../../../public/images/path-bar-vector.svg'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import QuestionCarousel from '@/components/question-carousel'
import QuestionTable from '@/components/learning-path/question-table'
import { LearningQuestionDTO } from '@/types/dto/types'
import { Chuong, LoTrinh } from '@/types/types'
import { useTranslations } from 'next-intl'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'

function LearningPage() {
  const { chapterId, licenseName } = useParams<{
    chapterId: string
    licenseName: string
  }>()

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 200,
    total: 0,
  })
  const [questions, setQuestions] = useState<LearningQuestionDTO[]>([])
  const { user, loading } = useAuth()
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0)
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [chapterData, setChapterData] = useState<Chuong | null>(null)
  const [isChapterPassed, setIsChapterPassed] = useState<boolean>(false)
  const [learningPath, setLearningPath] = useState<LoTrinh | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isTestCreated, setIsTestCreated] = useState<boolean>(true)

  const t = useTranslations('LearningPathPage')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!questions.length) {
      return
    }
    const hasShownDialog = JSON.parse(
      localStorage.getItem(
        `hasShownCompletionDialog-${learningPath?.id}-${chapterData?.id}`
      ) || 'false'
    )
    if (
      lastAnsweredQuestion === questions.length - 1 &&
      !isChapterPassed &&
      !hasShownDialog
    ) {
      setIsDialogOpen(true)
    }
  }, [lastAnsweredQuestion])

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)

        const { data: pathData, error: pathError } = await supabase.rpc(
          'fetch_learning_path_info',
          {
            path_name: licenseName,
          }
        )
        setLearningPath(pathData)

        const [{ data, error }, { data: chapter_data, error: chapter_error }] =
          await Promise.all([
            await supabase.rpc('fetch_user_questions', {
              chapter_id: chapterId,
              user_id: user.id,
              page: pagination.page,
              record_limit: pagination.limit,
              learning_path_id: pathData?.id,
            }),
            await supabase.rpc('fetch_chapter_info', {
              chapter_id: chapterId,
            }),
          ])

        const { data: pass, error: passError } = await supabase.rpc(
          'is_chapter_passed',
          {
            user_id: user?.id,
            chapter_id: chapter_data?.id,
            level_id: pathData?.ma_hang_bang,
          }
        )

        setIsChapterPassed(pass)

        setQuestions(data)
        if (data) {
          setPagination((prev) => ({
            ...prev,
            total: data[0]?.total_records,
          }))
        }
        setChapterData(chapter_data)

        const lastIndex = data.findLastIndex(
          (q: LearningQuestionDTO) => q.cau_tra_loi !== null
        )
        setSelectedQuestion(
          lastIndex + 1 >= data.length ? lastIndex : lastIndex + 1
        )

        const shouldOpen =
          lastIndex === data.length - 1 &&
          !pass &&
          !JSON.parse(
            localStorage.getItem(
              `hasShownCompletionDialog-${pathData?.id}-${chapter_data?.id}`
            ) || 'false'
          )

        setIsDialogOpen(shouldOpen)

        setLastAnsweredQuestion(lastIndex)
      } catch (error: any) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleAnswerChange = async (answerId: string, index: number) => {
    try {
      const { data, error } = await supabase.rpc('update_user_answers', {
        question_id: questions[selectedQuestion]?.id,
        user_id: user?.id,
        answer_id: answerId,
        path_id: learningPath?.id,
      })

      console.log('data::', data)

      if (error) {
        console.log(error)
      } else {
        setQuestions((prev) =>
          prev.map((q, i) =>
            i === index ? { ...q, cau_tra_loi: answerId } : q
          )
        )

        if (index > lastAnsweredQuestion) {
          setLastAnsweredQuestion(index)
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleQuestionChange = (change: number) => {
    if (
      selectedQuestion + change < 0 ||
      selectedQuestion + change >= questions.length ||
      !canGoToQuestion(selectedQuestion + change)
    ) {
      return
    }

    setSelectedQuestion(selectedQuestion + change)
  }

  const canGoToQuestion = (index: number) => {
    if (index < 0 || index >= questions.length || !isQuestionUnlocked(index)) {
      return false
    }

    return true
  }

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

  const isQuestionUnlocked = (index: number) => {
    if (index === 0) {
      return true
    }

    if (questions[index]?.cau_tra_loi) {
      return true
    }

    return (
      index === lastAnsweredQuestion + 1 && questions[index - 1]?.cau_tra_loi
    )
  }

  const getCorrectRatio = () => {
    const answeredQuestions = questions.filter(
      (question) => question.cau_tra_loi !== null
    )

    if (answeredQuestions.length === 0) {
      return 0
    }

    const correctAnswers = answeredQuestions.filter((question) => {
      const correctAnswer = question.ds_lua_chon.find(
        (answer) => answer.la_lua_chon_dung
      )
      return question.cau_tra_loi === correctAnswer?.id
    })

    return Math.round((correctAnswers.length / answeredQuestions.length) * 100)
  }

  const handleCreateTest = async () => {
    try {
      setIsTestCreated(false)
      const { data, error } = await supabase.rpc('create_test', {
        user_id: user?.id,
        chapter_id: chapterData?.id,
        license_name: licenseName,
      })

      if (error) {
        console.log(error)
      } else {
        router.push(pathname + `/${chapterId}/${data}`)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)

    if (!open) {
      localStorage.setItem(
        `hasShownCompletionDialog-${learningPath?.id}-${chapterData?.id}`,
        'true'
      )
    }
  }

  return (
    <div>
      <div className="w-full max-w-[940px] h-[70px] mt-10 mx-auto relative bg-light-purple-admin flex">
        <div className="mr-[35px]">
          <Image src={PathBar} alt="Bar" className=" top-0 left-0" />
          <span className="absolute top-1/2 left-[25px] -translate-y-[50%] font-bold text-white text-[18px]">
            {chapterData?.ten_chuong}
          </span>
        </div>
        <div className="flex">
          <div className="flex flex-col text-[12px] text-purple h-full justify-between w-[275px] py-3">
            <span>
              {t('progress')}: {lastAnsweredQuestion + 1}/{questions.length}
            </span>
            <span>
              {t('ratio')}: {getCorrectRatio()}%
            </span>
          </div>
          <div className="py-3">
            {' '}
            <Separator
              orientation="vertical"
              className="bg-purple w-[3px] rounded-full py-3"
            />
          </div>
          {/* Question carousel */}
          <div className="flex-1 w-[400px] relative h-full ml-4">
            {!isLoading && (
              <QuestionCarousel
                className="px-4"
                initialSlide={Math.floor(lastAnsweredQuestion / 24)}
              >
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
                          disabled={!isQuestionUnlocked(index + bigIndex * 24)}
                          onClick={() =>
                            setSelectedQuestion(index + bigIndex * 24)
                          }
                          className={cn(
                            `w-6 h-6 rounded-full text-sm text-purple font-bold ${getAnswerBackground(
                              q
                            )} text-center`,
                            index + bigIndex * 24 === selectedQuestion &&
                              'ring ring-purple ring-offset-2',
                            q.cau_tra_loi && 'text-white',
                            !isQuestionUnlocked(index + bigIndex * 24) &&
                              'opacity-65'
                          )}
                        >
                          {index + 1 + bigIndex * 24}
                        </button>
                      ))}
                  </div>
                ))}
              </QuestionCarousel>
            )}
          </div>
        </div>
      </div>
      <QuestionTable
        question={questions[selectedQuestion]}
        index={selectedQuestion}
        onAnswerChange={handleAnswerChange}
        onQuestionChange={handleQuestionChange}
        canGoToQuestion={canGoToQuestion}
      />

      {lastAnsweredQuestion === questions.length - 1 && !isChapterPassed && (
        <div className="my-5 h-[50px] w-full bg-[#E8F5FF] flex justify-center items-center gap-[66px] ">
          <p className="uppercase text-sm font-medium">
            BẠN ĐÃ HOÀN THÀNH {chapterData?.ten_chuong}{' '}
          </p>

          <button className="min-w-20 text-white h-9 text-xs uppercase font-medium rounded-[16px] bg-[#5CAAE6]">
            KIEM TRA
          </button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[469px] py-9 px-[35px]">
          <DialogHeader className="text-[20px] font-bold text-purple">
            <DialogTitle className="w-full text-center">
              {t('congratulation')}
            </DialogTitle>
            <DialogDescription className="w-full text-center uppercase">
              {t('done')} {chapterData?.ten_chuong}!
            </DialogDescription>
          </DialogHeader>

          <p className="my-0 text-[14px] text-center">{t('testReady')}</p>
          <div className="w-full h-[2px] rounded-full bg-purple my-8"></div>

          <div className="w-[365px] mx-auto flex justify-between">
            <button
              disabled={!isTestCreated}
              onClick={handleCreateTest}
              className="relative disabled:opacity-50 font-bold text-[14px] text-white bg-purple rounded-[6px] w-[160px] h-[34px] uppercase"
            >
              {!isTestCreated && (
                <Loader2 className="animate-spin absolute left-3" />
              )}
              {t('testButton')}
            </button>
            <button
              disabled={!isTestCreated}
              onClick={() => {
                setIsDialogOpen(false)
                localStorage.setItem(
                  `hasShownCompletionDialog-${learningPath?.id}-${chapterData?.id}`,
                  'true'
                )
              }}
              className="font-bold text-[14px] text-white bg-[#979797] rounded-[6px] w-[160px] h-[34px] uppercase"
            >
              {t('backButton')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LearningPage
