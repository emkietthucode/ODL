'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SegmentedCircularChartProps {
  percentage: number
  segments?: number
  size?: number
  title?: string
  subtitle?: string
  color?: string
  backgroundColor?: string
  showCard?: boolean
  className?: string
  fontSize?: string
}

export default function SegmentedCircularChart({
  percentage = 70,
  segments = 20,
  size,
  title,
  subtitle,
  color = '#14b8a6', // teal-500
  backgroundColor = '#e5e7eb', // gray-300
  showCard = false,
  className = '',
  fontSize = '',
}: SegmentedCircularChartProps) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100)

  // Calculate how many segments should be filled
  const filledSegments = Math.round((validPercentage / 100) * segments)

  // Create data for each segment
  const segmentData = Array.from({ length: segments }, (_, index) => ({
    name: `segment-${index}`,
    value: 1, // Each segment has equal value
    filled: index < filledSegments,
  }))

  const ChartContent = () => (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ margin: 0, padding: 0 }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        style={{ margin: 0, padding: 0 }}
      >
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={segmentData}
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="49%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
            paddingAngle={2}
          >
            {segmentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.filled ? color : backgroundColor}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={cn(
            'text-2xl font-bold text-gray-800',
            fontSize && `text-[${fontSize}]`
          )}
        >
          {validPercentage}%
        </div>
        {title && (
          <div className="text-xs font-medium text-gray-600 mt-1">{title}</div>
        )}
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </div>
    </div>
  )

  if (!showCard) {
    return size ? (
      <div style={{ width: size, height: size }}>
        <ChartContent />
      </div>
    ) : (
      <ChartContent />
    )
  }

  return (
    <Card className="w-fit">
      <CardContent className="p-6">
        {size ? (
          <div style={{ width: size, height: size }}>
            <ChartContent />
          </div>
        ) : (
          <div style={{ width: 200, height: 200 }}>
            <ChartContent />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
