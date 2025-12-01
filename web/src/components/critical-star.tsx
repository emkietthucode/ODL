import { cn } from '@/lib/utils'
import { FaStar } from 'react-icons/fa6'

interface CriticalStarProps {
  className?: string
  displayText?: boolean
}

const CriticalStar = ({ className, displayText }: CriticalStarProps) => {
  return (
    <div className="relative group">
      <FaStar color="red" className={cn(``, className)} />
      {displayText && (
        <p className="text-red-500 font-semibold text-lg stroke-white absolute top-[-16px] left-[25px] w-[256px] hidden group-hover:block">
          Đây là câu điểm liệt!
        </p>
      )}
    </div>
  )
}

export default CriticalStar
