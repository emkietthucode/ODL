'use client'

import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import PathBar from '../../../../../public/images/path-bar-vector.svg'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import QuestionCarousel from '@/components/question-carousel'

function LearningPathPage() {
  const { licenseName } = useParams<{ licenseName: string }>()

  const { user, loading } = useAuth()

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchData = async () => {
      try {
        const [
          { data: learningPathData, error: learningPathError },
          { data: chaptersData, error: chaptersError },
        ] = await Promise.all([
          await supabase.rpc('fetch_learning_path_info', {
            path_name: licenseName,
          }),
          await supabase.rpc('find_chapters', {
            license_name: licenseName,
          }),
        ])

        console.log('learningPathData', learningPathData)
        console.log('questionsData', chaptersData)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchData()
  }, [user, licenseName])
  if (loading) return <div>Loading...</div>

  return (
    <div className="w-full max-w-[940px] h-[70px] my-10 mx-auto relative bg-light-purple-admin flex">
      <div className="mr-[35px]">
        <Image src={PathBar} alt="Bar" className=" top-0 left-0" />
        <span className="absolute top-1/2 left-[25px] -translate-y-[50%] font-bold text-white text-[18px]">
          Chương 1:
        </span>
      </div>

      <div className="flex">
        <div className="flex flex-col text-[12px] text-purple h-full justify-between w-[275px] py-3">
          <span>Tiến độ: 1/200</span>
          <span>Tỉ lệ đúng: 100%</span>
        </div>

        <div className="py-3">
          {' '}
          <Separator
            orientation="vertical"
            className="bg-purple w-[3px] rounded-full py-3"
          />
        </div>

        {/* Question carousel */}

        <div className="flex-1 w-[400px] relative h-full">
          <QuestionCarousel isLastSlide={0}>
            <div className="w-full max-w-[380px] flex justify-start flex-wrap gap-[5px] pl-5">
              {Array.from({ length: 24 }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'w-6 h-6 rounded-full text-purple font-bold bg-light-purple text-center',
                    index === 0 && 'ring ring-purple ring-offset-2'
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </QuestionCarousel>
        </div>
      </div>
    </div>
  )
}

export default LearningPathPage
