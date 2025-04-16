'use client'

import { useEffect, useRef, useState } from 'react'

interface TimerProps {
  time: number
  isActive: boolean
  onTimeUp: (time: number) => void
  onTimeChange?: (time: number) => void
}

function Timer({ time, isActive, onTimeUp, onTimeChange }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(time)
  const timeRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current)
      }
    }
  }, [isActive])

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onTimeUp(time - timeLeft)
    }
  }, [timeLeft, isActive, onTimeUp])

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(timeLeft)
    }
  }, [timeLeft, onTimeChange])

  useEffect(() => {
    setTimeLeft(time)
  }, [time])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  return <p>{formatTime(timeLeft)}</p>
}

export default Timer
