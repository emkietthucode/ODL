'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CircularProgressChart from '@/components/user-statistics/CircularProgressChart'
import ProgressCard from '@/components/user-statistics/ProgressCard'
import SegmentedCircularChart from '@/components/user-statistics/SegmentedCircularChart'
import StudyDashboard from '@/components/user-statistics/StudyDashboard'
import TimeChart from '@/components/user-statistics/TimeChart'
import { ChevronDown } from 'lucide-react'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

function GeneralStatistic() {
  return (
    <div className="flex mt-8 gap-[44px]">
      <div className="w-[604px]">
        <p>
          Xin chào <span className="font-semibold">PHƯƠNG NAM!</span>
        </p>
        <span className="text-[26px] font-semibold">LƯỢT TRUY CẬP </span>
        <div className="max-w-[604px] h-[377px]">
          <div className="grid gap-8">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium text-gray-600">
                    THỜI GIAN (PHÚT)
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Tuần này
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { date: 'Mon', practice: 2.5, study: 1.8 },
                        { date: 'Tue', practice: 3.2, study: 2.1 },
                        { date: 'Wed', practice: 1.8, study: 2.5 },
                        { date: 'Thu', practice: 2.8, study: 1.9 },
                        { date: 'Fri', practice: 2.1, study: 2.3 },
                        { date: 'Sat', practice: 3.5, study: 2.8 },
                        { date: 'Sun', practice: 2.9, study: 2.2 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                        tick={{ fill: '#6b7280' }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="text-xs"
                        tick={{ fill: '#6b7280' }}
                      />
                      <Bar
                        dataKey="practice"
                        fill="#14b8a6"
                        radius={[2, 2, 0, 0]}
                        maxBarSize={40}
                      />
                      <Bar
                        dataKey="study"
                        fill="#93c5fd"
                        radius={[2, 2, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <span className="text-sm text-gray-600">Thi thử</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                    <span className="text-sm text-gray-600">Luyện thi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-[64px] w-full">
          <div className="flex justify-between">
            <span className="font-semibold text-2">Tổng quát</span>
          </div>
          <div>
            <span className="font-light">Thi thử</span>
            <div className="flex justify-between w-full">
              <div className="w-[235px] h-[155px] bg-purple rounded-[20px] pt-[27px] pb-3 pl-[25px]">
                <p className="font-semibold text-white text-[15px]">
                  Số bài thi đã hoàn thành
                </p>

                <p className="font-extrabold text-[64px] text-white">09</p>
              </div>

              <div className="w-[316px] h-[155px] rounded-[20px] border-[1px] border-[#D5D5D5] px-4 pt-5 pb-3 flex justify-between relative">
                <div className="h-full flex flex-col justify-between">
                  <p className="font-bold">Tỉ lệ đạt</p>
                  <div className="w-[134px] flex justify-between">
                    <div>
                      <div className="flex items-center gap-[6px] mb-[10px]">
                        <div className="w-[22px] h-[22px] bg-[#DFEEDB] rounded-[8px]"></div>
                        <span className="font-semibold text-sm">2</span>
                      </div>

                      <div className="text-[12px]">Không đạt</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-[6px] mb-[10px]">
                        <div className="w-[22px] h-[22px] bg-[#A6D997] rounded-[8px]"></div>
                        <span className="font-semibold text-sm">98</span>
                      </div>

                      <div className="text-[12px]">Đạt</div>
                    </div>
                  </div>
                </div>
                <div className="w-[200px] h-[200px] absolute -right-8 top-1/2 translate-y-[-50%]">
                  <CircularProgressChart percentage={98} rounded={true} />
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full items-end mt-10">
              <div className="w-[316px] h-[155px] rounded-[20px] border-[1px] border-[#D5D5D5] px-5 pt-6 flex justify-between relative">
                <div>
                  <p className="text-xs">Ôn luyện</p>
                  <p className="max-w-[137px] font-bold mt-3">
                    Tỉ lệ hoàn thành trung bình:
                  </p>
                </div>
                <div className="w-[180px] h-[180px] absolute -right-6 top-1/2 translate-y-[-50%]">
                  <SegmentedCircularChart percentage={70} />
                </div>
              </div>

              <div className="">
                <span className="text-xs text-[#979797]">
                  Tiếp tục ôn luyện:
                </span>
                <div className="w-[280px] space-y-4">
                  <ProgressCard
                    title="A1 - Chương 1"
                    subtitle="125 câu hỏi"
                    percentage={75}
                    color="#3b82f6"
                    textColor="#ffffff"
                    className="max-h-[60px]"
                  />
                  <ProgressCard
                    title="A1 - Chương 3"
                    subtitle="90 câu hỏi"
                    percentage={25}
                    color="#91C54D"
                    textColor="#ffffff"
                    className="max-h-[60px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <StudyDashboard />
      </div>
    </div>
  )
}

export default GeneralStatistic
