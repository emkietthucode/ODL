'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface ProgressCardProps {
  title: string
  subtitle: string
  percentage: number
  color?: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

export default function ProgressCard({
  title,
  subtitle,
  percentage,
  color = '#3b82f6', // blue-500
  backgroundColor = '#ffffff',
  textColor = '#ffffff',
  className = '',
}: ProgressCardProps) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100)

  const data = [
    { name: 'completed', value: validPercentage },
    { name: 'remaining', value: 100 - validPercentage },
  ]

  const COLORS = [textColor, `${textColor}40`] // Second color is more transparent

  return (
    <div
      className={`flex items-center px-4
         justify-between rounded-2xl shadow-sm ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Left side - Text content */}
      <div className="flex-1">
        <h3 className="font-bold " style={{ color: textColor }}>
          {title}
        </h3>
        <p className="text-xs opacity-90" style={{ color: textColor }}>
          {subtitle}
        </p>
      </div>

      {/* Right side - Circular progress */}
      <div className="w-20 h-20 ml-4 flex-shrink-0">
        <div className="relative w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="48%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
                strokeLinecap="round"
                cornerRadius={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: textColor }}>
              {validPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
