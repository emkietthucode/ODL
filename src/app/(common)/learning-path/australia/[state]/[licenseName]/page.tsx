'use client'

import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { Pie, PieChart } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { FaLock } from 'react-icons/fa'
import WorkingDesk from '../../../../../../../public/images/working-desk.svg'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import Card1 from '../../../../../../../public/images/f11LearningCardIcon1.svg'
import Card2 from '../../../../../../../public/images/f11LearningCardIcon2.svg'
import Card3 from '../../../../../../../public/images/f11LearningCardIcon3.svg'
import Card4 from '../../../../../../../public/images/f11LearningCardIcon4.svg'
import FeatureCard from '@/components/feature-card'
import { Chuong, LoTrinh } from '@/types/types'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { FaCircleCheck } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'

const chartConfig = {
  count: {
    label: 'Visitors',
  },
  done: {
    color: '#A08CE6',
  },
} satisfies ChartConfig

interface ChuongExtended extends Chuong {
  tong_so_cau: number
  so_cau_da_lam: number
  thu_tu: number
  passed: boolean
}

function LearningPathPage() {
  const { licenseName } = useParams<{ licenseName: string }>()
  const [learningPathData, setLearningPathData] = useState<LoTrinh | null>(null)
  const [chaptersData, setChaptersData] = useState<ChuongExtended[]>([])
  const [selectedChapter, setSelectedChapter] = useState<ChuongExtended | null>(
    null
  )
  const [isTestCreated, setIsTestCreated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const t = useTranslations('LearningCategory')

  const chartData = useMemo(() => {
    setLoading(false)
    return [
      {
        status: 'done',
        count: chaptersData?.filter((chapter) => chapter.passed).length,
        fill: '#A08CE6',
      },
      {
        status: 'not done',
        count:
          chaptersData?.length -
            chaptersData?.filter((chapter) => chapter.passed).length || 0,
        fill: '#DBDBDB',
      },
    ]
  }, [chaptersData])

  useEffect(() => {
    if (!user) {
      return
    }

    const fetchData = async () => {
      try {
        const { data: pathData, error: pathDataError } = await supabase.rpc(
          'fetch_australia_path_info',
          {
            path_name: licenseName,
          }
        )

        const { data: chaptersData, error: chaptersError } = await supabase.rpc(
          'find_chapters',
          {
            learning_path_id: pathData?.id,
            license_id: pathData?.ma_hang_bang,
            user_id: user.id,
          }
        )

        setChaptersData(chaptersData)
        if (chaptersData && chaptersData.length > 0) {
          setSelectedChapter(chaptersData[0])
        }
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchData()
  }, [user, licenseName])

  const handleCreateTest = async () => {
    try {
      setIsTestCreated(false)
      const { data, error } = await supabase.rpc('create_test_australia', {
        user_id: user?.id,
        chapter_id: selectedChapter?.id,
        license_name: licenseName,
      })

      if (error) {
        console.log(error)
      } else {
        router.push(pathname + `/${selectedChapter?.id}/${data}`)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="w-full max-w-[1080px]  mt-10 mb-[52px] mx-auto relative ">
        <div className="w-20 h-[3px] bg-[#907ECF] rounded-full"></div>
        <p className="uppercase font-bold text-[26px] text-purple my-[14px]">
          {t('title')}
        </p>
        <p className="max-w-[682px] text-purple text-[14px]">
          {t('description')}
        </p>
      </div>
      <div className="w-full bg-light-purple h-[600px]">
        <div className="max-w-[1065px] mx-auto pt-[23px] pb-[28px]">
          <p className="uppercase font-semibold text-[20px] text-purple">
            {t('yourProgress')}
          </p>
          <div className="flex gap-[65px] h-[456px] mt-[25px]">
            <div className="w-60 h-full bg-[#F6F4FD] rounded-[16px]">
              <p className="w-full text-center font-medium text-[14px] text-[#3D7199] mt-[25px] mb-[36px]">
                {t('doneChapter')}
              </p>

              {!loading && (
                <ChartContainer config={chartConfig}>
                  <PieChart width={136} height={136}>
                    <Pie
                      dataKey="count"
                      nameKey="status"
                      data={chartData}
                      innerRadius={40}
                      outerRadius={65}
                      fill="#DBDBDB"
                      direction="clokewise"
                      startAngle={90} // Start at the bottom
                      endAngle={450} // End at the top
                    ></Pie>
                  </PieChart>
                </ChartContainer>
              )}

              <p className="font-extrabold text-4xl text-purple mt-[57px] w-full text-center">
                {chaptersData?.filter((chapter) => chapter.passed).length}/
                {chaptersData?.length || 0}
              </p>
              <p className="w-full text-center text-[14px] font-medium text-purple mt-[11px]">
                {t('letStart')}
              </p>
            </div>

            <div className="w-[760px] h-full flex flex-col">
              <div className="px-8 py-2 items-center flex-wrap flex-1 flex bg-light-purple-admin rounded-t-[16px] gap-4 justify-start">
                {chaptersData?.map((chapter, index) => (
                  <button
                    disabled={!chaptersData[index - 1]?.passed && index > 0}
                    onClick={() => {
                      setSelectedChapter(chapter)
                    }}
                    key={chapter.id}
                    className={cn(
                      'relative min-w-[118px] h-[42px] text-purple rounded-full bg-white text-[18px] font-bold uppercase border-2 border-[#7869AD] disabled:opacity-50 disabled:cursor-auto',
                      selectedChapter?.id === chapter.id &&
                        "after:content-[''] after:absolute after:w-[85%] after:h-[3px] after:bg-[#8070B8] after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2"
                    )}
                  >
                    {chapter.ten_chuong}
                    {!chaptersData[index - 1]?.passed && index > 0 && (
                      <FaLock
                        className="absolute right-0 -bottom-3"
                        fill="#979797"
                        stroke="#979797"
                        size={24}
                      />
                    )}

                    {chapter.passed && (
                      <FaCircleCheck
                        className="absolute -right-1 -bottom-[10px]"
                        fill="#A3C9A8"
                        stroke="#A3C9A8"
                        size={20}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="w-full h-[280px] bg-[#F0F8FF] rounded-b-[16px] pt-[30px] pb-[28px] pl-[66px] pr-[53px]">
                <p className="text-[14px] text-[#60548A]">
                  <b>{selectedChapter?.ten_chuong}</b>:{' '}
                  {selectedChapter?.mo_ta_chuong}
                </p>

                <div className="bg-purple w-full rounded-full h-[1px] my-[25px]"></div>

                <div className="flex h-full gap-[165px] ">
                  <div className="relative min-w-[220px]">
                    <p className="text-[14px]">
                      {t('status')}:{' '}
                      <b>
                        {selectedChapter?.passed ? t('done') : t('notDone')}
                      </b>
                    </p>
                    <Image
                      width={200}
                      height={200}
                      src={WorkingDesk}
                      alt="image"
                      className="absolute bottom-16 !w-[200px] !h-[200px]"
                    />
                  </div>

                  <div className="w-[200px]">
                    <p className="text-[14px] mb-[5px]">{t('progress')}:</p>

                    <p className="w-full text-end text-[14px] text-[#5CAAE6]">
                      {selectedChapter?.so_cau_da_lam}/
                      {selectedChapter?.tong_so_cau}
                    </p>
                    <Progress
                      value={
                        ((selectedChapter?.so_cau_da_lam ?? 0) /
                          (selectedChapter?.tong_so_cau ?? 1)) *
                        100
                      }
                      className="w-[200px] h-1 rounded-none"
                      indicatorClassName="bg-[#5CAAE6]"
                    />

                    <div className="mt-[74px] flex gap-[16px]">
                      <button
                        onClick={() =>
                          router.push(pathname + `/${selectedChapter?.id}`)
                        }
                        className="hover:opacity-80 text-[14px] bg-purple text-white shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase"
                      >
                        {t('learn')}
                      </button>

                      {selectedChapter?.so_cau_da_lam ===
                      selectedChapter?.tong_so_cau ? (
                        <button
                          onClick={handleCreateTest}
                          disabled={isTestCreated}
                          className="hover:opacity-80 text-[14px] bg-[#F5D5F1] text-[#C96BBC] shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase"
                        >
                          {t('test')}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="relative cursor-auto text-[14px] bg-[#D8D8D8] text-[#979797] shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase"
                        >
                          {t('test')}
                          <FaLock
                            className="absolute right-0 -bottom-2"
                            fill="#979797"
                            stroke="#979797"
                            size={20}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1065px] mx-auto mb-[61px]">
        <p className="text-[20px] font-light text-[#7869AD] w-full text-center mt-[46px]">
          {t('otherFunctions')}
        </p>

        <div className="flex gap-10 justify-center mt-8 ">
          <FeatureCard
            title={t('testFunction')}
            description={t('testFuncDescription')}
            icon={Card1}
            to="/tests"
          />

          <FeatureCard
            title={t('signFunction')}
            description={t('signFuncDescription')}
            icon={Card2}
            to="/learn/vietnam/signs"
          />

          <FeatureCard
            title={t('criticalFunction')}
            description={t('criticalFuncDescription')}
            icon={Card3}
            to="/"
          />

          <FeatureCard
            title={t('challengeBankFunction')}
            description={t('challengeBankFuncDescription')}
            icon={Card4}
            to="/missed-questions"
          />
        </div>
      </div>
    </div>
  )
}

export default LearningPathPage
