'use client'

import { Card, CardContent } from '@/components/ui/card'

interface ChapterCardProps {
  chapterNumber: number
  title: string
  subtitle: string
  score?: number
  isActive?: boolean
  isLocked?: boolean
}

function ChapterCard({
  chapterNumber,
  title,
  subtitle,
  score,
  isActive = false,
  isLocked = false,
}: ChapterCardProps) {
  return (
    <Card
      className={`${
        isActive ? 'border-2 border-blue-500' : 'border border-gray-200'
      } bg-gray-50`}
    >
      <CardContent className="p-4 bg-[#E9F2F4]">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <div className="ml-4">
            {score !== undefined ? (
              <div
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
                }`}
              >
                {score}
              </div>
            ) : (
              <div className="w-8 h-6 bg-gray-400 rounded-md"></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ChapterTests() {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-6">Bài kiểm tra chương</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChapterCard
          chapterNumber={1}
          title="Chương 1"
          subtitle="Trạng thái: hoàn thành"
          score={25}
        />

        <ChapterCard
          chapterNumber={2}
          title="Chương 2"
          subtitle="Trạng thái: hoàn thành"
          score={23}
        />

        <ChapterCard
          chapterNumber={3}
          title="Chương 3"
          subtitle="Trạng thái: chưa mở khóa"
        />

        <ChapterCard
          chapterNumber={4}
          title="Chương 4"
          subtitle="Trạng thái: chưa mở khóa"
          isLocked={true}
        />
      </div>
    </div>
  )
}
