'use client'

import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { Pie, PieChart } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { FaLock } from 'react-icons/fa'
import WorkingDesk from '../../../../../public/images/working-desk.svg'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

const chartData = [
  { status: 'not-done', count: 2, fill: '#DBDBDB' },
  { status: 'done', count: 1, fill: '#A08CE6' },
]

const chartConfig = {
  count: {
    label: 'Visitors',
  },
  done: {
    color: '#A08CE6',
  },
} satisfies ChartConfig

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
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchData()
  }, [user, licenseName])
  if (loading) return <div>Loading...</div>

  return (
    <div>
      <div className="w-full max-w-[1080px]  mt-10 mb-[52px] mx-auto relative ">
        <div className="w-20 h-[3px] bg-[#907ECF] rounded-full"></div>
        <p className="uppercase font-bold text-[26px] text-purple my-[14px]">
          Lộ trình học bằng lái
        </p>
        <p className="max-w-[682px] text-purple text-[14px]">
          Lộ trình học giúp bạn theo dõi quá trình ôn tập một cách khoa học và
          tuần tự. Hoàn thành từng chương để mở khóa nội dung tiếp theo và tiến
          gần hơn đến việc vượt qua kỳ thi bằng lái!
        </p>
      </div>
      <div className="w-full bg-light-purple h-[482px] ">
        <div className="max-w-[1065px] mx-auto pt-[23px] pb-[28px]">
          <p className="uppercase font-semibold text-[20px] text-purple">
            Tiến trình của bạn
          </p>

          <div className="flex gap-[65px] h-[382px] mt-[25px]">
            <div className="w-60 h-full bg-[#F6F4FD] rounded-[16px]">
              <p className="w-full text-center font-medium text-[14px] text-[#3D7199] mt-[25px] mb-[36px]">
                Số chương đã hoàn thành:
              </p>

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

              <p className="font-extrabold text-4xl text-purple mt-[57px] w-full text-center">
                0/3
              </p>
              <p className="w-full text-center text-[14px] font-medium text-purple mt-[11px]">
                Cùng bắt đầu nào!
              </p>
            </div>

            <div className="w-[760px] h-full flex flex-col">
              <div className="w-full items-center flex-1 flex bg-light-purple-admin rounded-t-[16px] gap-4 justify-center">
                <button
                  className="
                relative  
                min-w-[118px] 
                h-[42px]
              text-purple 
                rounded-full 
              bg-white text-[18px] 
                font-bold 
                uppercase 
                border-2 
                border-[#7869AD]
                after:content-['']
                after:absolute
                after:w-[85%]
                after:h-[3px]
                after:bg-[#8070B8]
                after:rounded-full
                after:-bottom-3
                after:left-1/2
                after:-translate-x-1/2
                "
                >
                  chương 1
                </button>

                <button
                  className="
                relative  
                min-w-[118px] 
                h-[42px]
              text-purple 
                rounded-full 
              bg-white text-[18px] 
                font-bold 
                uppercase 
                border-2 
                border-[#7869AD]
                opacity-50
                cursor-auto
                "
                >
                  chương 1
                  <FaLock
                    className="absolute right-0 -bottom-3"
                    fill="#979797"
                    stroke="#979797"
                    size={24}
                  />
                </button>

                <button
                  className="
                relative  
                min-w-[118px] 
                h-[42px]
              text-purple 
                rounded-full 
              bg-white text-[18px] 
                font-bold 
                uppercase 
                border-2 
                border-[#7869AD]
                opacity-50
                cursor-auto
                "
                >
                  chương 1
                  <FaLock
                    className="absolute right-0 -bottom-3"
                    fill="#979797"
                    stroke="#979797"
                    size={24}
                  />
                </button>
              </div>
              <div className="w-full h-[280px] bg-[#F0F8FF] rounded-b-[16px] pt-[30px] pb-[28px] pl-[66px] pr-[53px]">
                <p className="text-[14px] text-[#60548A]">
                  <b>Chương 1</b>: 100 câu về kiến thức luật
                </p>

                <div className="bg-purple w-full rounded-full h-[1px] my-[25px]"></div>

                <div className="flex h-full gap-[165px]">
                  <div className="relative">
                    <p className="text-[14px]">
                      Trạng thái: <b>Chưa hoàn thành</b>
                    </p>
                    <Image
                      width={200}
                      height={200}
                      src={WorkingDesk}
                      alt="image"
                      className="absolute bottom-16"
                    />
                  </div>

                  <div className="w-[200px]">
                    <p className="text-[14px] mb-[5px]">Tiến trình:</p>

                    <p className="w-full text-end text-[14px] text-[#5CAAE6]">
                      20/100
                    </p>
                    <Progress
                      value={20}
                      className="w-[200px] h-1 rounded-none"
                      indicatorClassName="bg-[#5CAAE6]"
                    />

                    <div className="mt-[74px] flex gap-[16px]">
                      <button className="hover:opacity-80 text-[14px] bg-purple text-white shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase">
                        luyện thi
                      </button>

                      {/* <button className="hover:opacity-80 text-[14px] bg-[#F5D5F1] text-[#C96BBC] shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase">
                        kiểm tra
                      </button> */}

                      <button className="relative cursor-auto text-[14px] bg-[#D8D8D8] text-[#979797] shadow-sm font-semibold w-[98px] h-[37px] rounded-full uppercase">
                        kiểm tra
                        <FaLock
                          className="absolute right-0 -bottom-2"
                          fill="#979797"
                          stroke="#979797"
                          size={20}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1065px] mx-auto">
        <p className="text-[20px] font-light text-[#7869AD] w-full text-center mt-[46px]">
          Các tính năng khác
        </p>

        <div className="flex gap-10 justify-center mt-8">
          <div className="w-60 h-[158px] p-[10px] rounded-[30px] shadow-[2px_4px_10px_4px_rgba(0,0,0,0.18)]">
            <p className="mt-[40px] mb-[12px] text-[14px] font-semibold text-[#7869AD] uppercase">
              thi thử
            </p>
            <p className="text-[14px] text-[#7869AD]">
              Mô phỏng bài thi lý thuyết, giúp bạn làm quen.
            </p>
          </div>

          <div className="w-60 h-[158px] p-[10px] rounded-[30px] shadow-[2px_4px_10px_4px_rgba(0,0,0,0.18)]">
            <p className="mt-[40px] mb-[12px] text-[14px] font-semibold text-[#7869AD] uppercase">
              thi thử
            </p>
            <p className="text-[14px] text-[#7869AD]">
              Mô phỏng bài thi lý thuyết, giúp bạn làm quen.
            </p>
          </div>

          <div className="w-60 h-[158px] p-[10px] rounded-[30px] shadow-[2px_4px_10px_4px_rgba(0,0,0,0.18)]">
            <p className="mt-[40px] mb-[12px] text-[14px] font-semibold text-[#7869AD] uppercase">
              thi thử
            </p>
            <p className="text-[14px] text-[#7869AD]">
              Mô phỏng bài thi lý thuyết, giúp bạn làm quen.
            </p>
          </div>

          <div className="w-60 h-[158px] p-[10px] rounded-[30px] shadow-[2px_4px_10px_4px_rgba(0,0,0,0.18)]">
            <p className="mt-[40px] mb-[12px] text-[14px] font-semibold text-[#7869AD] uppercase">
              thi thử
            </p>
            <p className="text-[14px] text-[#7869AD]">
              Mô phỏng bài thi lý thuyết, giúp bạn làm quen.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningPathPage
