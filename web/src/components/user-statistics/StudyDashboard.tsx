'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'

export default function StudyDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date()) // July 11, 2025

  const [streak, setStreak] = useState<number>(0)
  const { user } = useAuth()
  const [testsData, setTestsData] = useState<any>({
    total: 0,
    passed: 0,
    failed: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.rpc('get_user_streak', {
            user_id: user?.id,
          })

          setStreak(data || 0)

          const { data: testsData, error: testsError } = await supabase.rpc(
            'get_user_test_stats',
            {
              user_id: user?.id,
            }
          )

          setTestsData({
            total: testsData?.total_tests || 0,
            passed: testsData?.passed_tests || 0,
            failed: testsData?.failed_tests || 0,
          })
        } catch (error: any) {
          console.error('Error fetching data:', error.message)
        }
      }
    }

    fetchData()
  }, [user])

  // Generate calendar days for July 2025
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ]
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="w-[440px] bg-white rounded-lg shadow-sm border">
      <Card className="border-none shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.slice(0, 35).map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentDate.getMonth()
              const isSelected =
                day.getDate() === currentDate.getDate() && isCurrentMonth
              const dayNumber = day.getDate()
              const isInStreak =
                day.getDate() > currentDate.getDate() - streak &&
                isCurrentMonth &&
                day.getDate() <= currentDate.getDate()

              return (
                <button
                  key={index}
                  className={`
                    h-8 w-8 text-sm rounded-full flex items-center justify-center
                    ${isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
                    ${isSelected ? 'bg-purple text-white' : 'hover:bg-gray-100'}
                    ${isInStreak ? 'underline' : ''}
                  `}
                >
                  {dayNumber}
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-800">
                Bạn đã đạt chuỗi:
              </span>
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500">
                  {streak}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Làm đề thi trực hoặc học 30 câu hỏi để giữ chuỗi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Section */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Đánh giá</h3>
          <Select defaultValue="bang-ai">
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bang-ai">BẢNG AI</SelectItem>
              <SelectItem value="bang-b">BẢNG B</SelectItem>
              <SelectItem value="bang-c">BẢNG C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-gray-600 mb-10">
          Trong các bài thi gần đây:
        </p>

        {/* Progress Items */}
        <div className="space-y-8 px-2 py-4 rounded-[12px] bg-[#FAFBFD]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">
              Tỉ lệ đạt bài thi thử
            </span>
            <span className="text-sm font-medium text-purple-600">90%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">
              Số lần sai câu điểm liệt
            </span>
            <span className="text-sm font-medium text-gray-600">0</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">
              Hoàn thành ôn luyện:
            </span>
            <span className="text-sm font-medium text-purple-600">
              Hoàn thành
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 font-medium">
              Học lại câu thường sai:
            </span>
            <span className="text-sm font-medium text-purple-600">
              Hoàn thành
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-[#A3C9A8]  text-white rounded-t-[40px] py-4 h-[120px]">
            <div className="text-center flex flex-col items-center justify-center">
              <div className="font-medium my-4">CHÚC MỪNG!</div>
              <div className="text-sm opacity-90">
                Bạn đã sẵn sàng cho bài thi thực tế
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
