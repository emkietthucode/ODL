'use client'
import * as React from 'react'

export interface TabProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`${
        isActive ? 'font-bold text-purple' : 'font-medium text-zinc-400'
      } cursor-pointer w-20 text-center`}
      onClick={onClick}
    >
      <div className="self-center p-2 mb-1">{label}</div>
      {isActive && (
        <div className="w-full h-1 bg-purple self-stretch rounded-r"></div>
      )}
    </div>
  )
}
