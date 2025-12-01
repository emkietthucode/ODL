'use client'

import Link from 'next/link'

import { IoPencilSharp } from 'react-icons/io5'
import { IoBookOutline } from 'react-icons/io5'
import { FaList } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Pana from '../../../../public/images/pana.svg'
import Image from 'next/image'

function StatisticsDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex">
      <div className="w-[200px] h-full bg-light-purple-admin rounded-tr-[120px] pt-[66px] pb-[83px] px-[20px] mr-[50px]">
        <div className=" font-bold text-2xl text-[#8070B8] pt-[32px] pb-[60px]">
          THỐNG KÊ
        </div>

        <div className="pt-[114px] text-[#BDBDBD]">
          <Link
            href="/statistics/general"
            className={cn(
              'flex items-center gap-8',
              pathname.includes('/statistics/general') && 'text-[#A08CE6]'
            )}
          >
            <FaList /> <span>Tổng quát</span>
          </Link>
          <Link href="/" className="flex items-center gap-8 my-12">
            <IoPencilSharp /> <span>Thi thử</span>
          </Link>
          <Link
            href="/statistics/learning"
            className={cn(
              'flex items-center gap-8',
              pathname.includes('/statistics/learning') && 'text-[#A08CE6]'
            )}
          >
            <IoBookOutline /> <span>Luyện thi</span>
          </Link>
        </div>

        <Image
          src={Pana}
          alt="something"
          width={234}
          height={140}
          className="mx-auto mt-[280px]"
        />
      </div>
      {children}
    </div>
  )
}

export default StatisticsDashboard
