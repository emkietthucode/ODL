'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent } from '@/components/ui/card'

interface CircularProgressChartProps {
  percentage: number
  size?: number
  strokeWidth?: number
  title?: string
  subtitle?: string
  color?: string
  backgroundColor?: string
  rounded?: boolean
  showCard?: boolean
  transparent?: boolean
  className?: string
}

export default function CircularProgressChart({
  percentage = 98,
  size,
  strokeWidth = 20,
  title,
  subtitle,
  color = '#A6D997', // green-500
  backgroundColor = '#DFEEDB', // green-100
  rounded = true,
  showCard = false,
  transparent = true,
  className = '',
}: CircularProgressChartProps) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100)

  const data = [
    { name: 'completed', value: validPercentage },
    { name: 'remaining', value: 100 - validPercentage },
  ]

  const COLORS = [color, backgroundColor]

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
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="35%"
            outerRadius="49%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            strokeLinecap={rounded ? 'round' : 'butt'}
            cornerRadius={rounded ? 4 : 0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-bold text-gray-800">
          {validPercentage}%
        </div>
        {title && (
          <div className="text-xs font-medium text-[#A6D997] mt-1">{title}</div>
        )}
        {subtitle && <div className="text-xs text-[#A6D997]">{subtitle}</div>}
      </div>
    </div>
  )

  if (!showCard) {
    // Chart fills the entire container div with no margins
    return <ChartContent />
  }

  return (
    <Card
      className={`w-fit ${
        transparent ? 'bg-transparent border-none shadow-none' : ''
      }`}
    >
      <CardContent className={transparent ? 'p-0' : 'p-6'}>
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
