import { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface SidebaritemProps {
  icon: StaticImageData
  hoverIcon: StaticImageData
  label: string
  active?: boolean
  href: string
}

const SidebarItem: React.FC<SidebaritemProps> = ({
  icon,
  hoverIcon,
  label,
  active,
  href,
}) => {
  const [isHovering, setIsHovered] = useState(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return (
    <div
      className="flex items-center hover:bg-accent hover:text-accent-foreground"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {active ? (
        <>
          <div className="w-[6px] bg-purple self-stretch rounded-r"></div>
          <Link
            href={href}
            className={twMerge(`
                        flex
                        flex-row
                        h-auto
                        items-center
                        w-full
                        gap-x-7
                        text-md
                        font-medium
                        cursor-pointer
                        transition
                        text-purple
                        py-3
                        px-5            
                    `)}
          >
            <Image src={hoverIcon} alt="" />
            <p className="truncate w-full">{label}</p>
          </Link>
        </>
      ) : (
        <>
          <div className="w-[6px] self-stretch rounded-r"></div>
          <Link
            href={href}
            className={twMerge(`
                        flex
                        flex-row
                        h-auto
                        items-center
                        w-full
                        gap-x-7
                        text-md
                        font-medium
                        cursor-pointer
                        transition
                        text-neutral-400
                        py-3
                        px-5            
                    `)}
          >
            <Image src={icon} alt="" />
            <p className="truncate w-full">{label}</p>
          </Link>
        </>
      )}
    </div>
  )
}

export default SidebarItem
