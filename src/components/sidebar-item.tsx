import { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SidebarItemProps {
  icon: StaticImageData
  hoverIcon: StaticImageData
  label: string
  active?: boolean
  href: string
  subItems?: { label: string; href: string }[]
  isExpanded?: boolean
  onToggleExpand?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  hoverIcon,
  label,
  active,
  href,
  subItems,
  isExpanded,
  onToggleExpand,
}) => {
  const [isHovering, setIsHovered] = useState(false)
  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return (
    <div className="flex flex-col">
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
              {subItems && (
                <button onClick={onToggleExpand}>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              )}
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
              {subItems && (
                <button onClick={onToggleExpand}>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              )}
            </Link>
          </>
        )}
      </div>
      {subItems && isExpanded && (
        <div className="ml-[63px] mt-2">
          <hr className="w-[170px] h-px bg-neutral-200 border-0 rounded dark:bg-neutral-200"></hr>
          {subItems.map((subItem) => (
            <Link
              key={subItem.label}
              href={subItem.href}
              className={twMerge(`
                block
                ml-2
                py-2
                px-4
                text-sm
                font-medium
                cursor-pointer
                transition
                text-neutral-400
                hover:text-purple
              `)}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarItem
