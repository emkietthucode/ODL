'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import CountryIcon from '../../public/icons/country.png'
import StateIcon from '../../public/icons/state.png'
import LicenseIcon from '../../public/icons/license.png'
import TestIcon from '../../public/icons/test.png'
import UserIcon from '../../public/icons/user.png'
import CountryHoverIcon from '../../public/icons/country-hover.png'
import StateHoverIcon from '../../public/icons/state-hover.png'
import LicenseHoverIcon from '../../public/icons/license-hover.png'
import TestHoverIcon from '../../public/icons/test-hover.png'
import UserHoverIcon from '../../public/icons/user-hover.png'
import Box from './box'
import SidebarItem from './sidebar-item'
import { ChevronDown, ChevronUp } from 'lucide-react'

const SideBar = () => {
  const pathname = usePathname()
  const [isTestExpanded, setIsTestExpanded] = useState(false)

  const routes = useMemo(
    () => [
      {
        icon: CountryIcon,
        hoverIcon: CountryHoverIcon,
        label: 'Quốc gia',
        active: pathname === '/admin/countries',
        href: '/admin/countries',
      },
      {
        icon: StateIcon,
        hoverIcon: StateHoverIcon,
        label: 'Tiểu bang',
        active: pathname === '/admin/states',
        href: '/admin/states',
      },
      {
        icon: LicenseIcon,
        hoverIcon: LicenseHoverIcon,
        label: 'Hạng bằng',
        active: pathname === '/admin/licences',
        href: '/admin/licences',
      },
      {
        icon: TestIcon,
        hoverIcon: TestHoverIcon,
        label: 'Bộ câu hỏi',
        active: pathname.startsWith('/admin/questions'),
        href: '/admin/questions',
        subItems: [
          { label: 'Chương', href: '/admin/questions/chapters' },
          { label: 'Lộ trình', href: '/admin/questions/roadmap' },
        ],
      },
      {
        icon: UserIcon,
        hoverIcon: UserHoverIcon,
        label: 'Người dùng',
        active: pathname === '/admin/users',
        href: '/admin/users',
      },
    ],
    [pathname]
  )

  const toggleTestExpand = () => {
    setIsTestExpanded(!isTestExpanded)
  }

  return (
    <div className="relative -mr-4 z-10 flex flex-col rounded-r-2xl shadow-[4px_0px_4px_rgba(0,0,0,0.25)] border-1 bg-white">
      <div className="self-baseline ml-7 mt-10 text-xl font-semibold text-violet-400">
        QUẢN LÝ
      </div>
      <hr className="w-[235px] h-px mx-auto bg-light-purple border-0 rounded md:my-5 dark:bg-purple"></hr>
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[250px]">
        <Box>
          <div className="flex flex-col gap-y-4">
            {routes.map((item) => (
              <SidebarItem
                key={item.label}
                {...item}
                isExpanded={isTestExpanded}
                onToggleExpand={
                  item.label === 'Bộ câu hỏi' ? toggleTestExpand : undefined
                }
              />
            ))}
          </div>
        </Box>
      </div>
    </div>
  )
}

export default SideBar
