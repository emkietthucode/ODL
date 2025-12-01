'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const chartData = [
  {
    date: '1/7',
    thiThu: 48,
    luyenThi: 20,
  },
  {
    date: '2/7',
    thiThu: 52,
    luyenThi: 25,
  },
  {
    date: '3/7',
    thiThu: 35,
    luyenThi: 30,
  },
  {
    date: '4/7',
    thiThu: 42,
    luyenThi: 22,
  },
  {
    date: '5/7',
    thiThu: 32,
    luyenThi: 25,
  },
  {
    date: '6/7',
    thiThu: 40,
    luyenThi: 33,
  },
  {
    date: '7/7',
    thiThu: 45,
    luyenThi: 30,
  },
]

const chartConfig = {
  thiThu: {
    label: 'Thi thử',
    color: '#14b8a6', // teal-500
  },
  luyenThi: {
    label: 'Luyện thi',
    color: '#93c5fd', // blue-300
  },
} satisfies ChartConfig

export default function TimeChart() {
  return (
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
          1/7 đến 7/7
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
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
              domain={[0, 60]}
              ticks={[0, 10, 20, 30, 40, 50]}
            />
            <ChartTooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="thiThu"
              fill="var(--color-thiThu)"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="luyenThi"
              fill="var(--color-luyenThi)"
              radius={[2, 2, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ChartContainer>

        {/* Custom Legend */}
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
  )
}
