'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import CountryIcon from '../../public/icons/country.png'
import StateIcon from '../../public/icons/state.png'
import LicenseIcon from '../../public/icons/license.png'
import TestIcon from '../../public/icons/test.png'
import UserIcon from '../../public/icons/user.png'
import PathIcon from '../../public/icons/path.png'
import CountryHoverIcon from '../../public/icons/country-hover.png'
import StateHoverIcon from '../../public/icons/state-hover.png'
import LicenseHoverIcon from '../../public/icons/license-hover.png'
import TestHoverIcon from '../../public/icons/test-hover.png'
import UserHoverIcon from '../../public/icons/user-hover.png'
import PathHoverIcon from '../../public/icons/path-hover.png'
import Box from './box'
import SidebarItem from './sidebar-item'

const SideBar = () => {
  const pathname = usePathname()
  console.log(pathname)

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
        active: pathname === '/admin/licenses',
        href: '/admin/licenses',
      },
      {
        icon: TestIcon,
        hoverIcon: TestHoverIcon,
        label: 'Đề thi',
        active: pathname === '/admin/tests',
        href: '/admin/tests',
      },
      {
        icon: UserIcon,
        hoverIcon: UserHoverIcon,
        label: 'Người dùng',
        active: pathname === '/admin/users',
        href: '/admin/users',
      },
      {
        icon: PathIcon,
        hoverIcon: PathHoverIcon,
        label: 'Lộ trình',
        active: pathname === '/admin/learning-paths',
        href: '/admin/learning-paths',
      },
    ],
    [pathname]
  )

  return (
    <div className="flex mt-[100px]">
      <div
        className="
                hidden
                md:flex
                flex-col
                gap-y-2
                h-full
                w-[250px]
            "
      >
        <Box>
          <div
            className="
                        flex
                        flex-col
                        gap-y-4
                    "
          >
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
      </div>
    </div>
  )
}

export default SideBar
