'use client'

import useAuth from '@/hooks/useAuth'

import { LuUserRound } from 'react-icons/lu'
import { IoSettingsOutline } from 'react-icons/io5'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from './ui/button'
import { signOut } from '@/app/auth/actions'

const NavBar = () => {
  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  return (
    <div className="flex justify-around items-center p-4">
      <div className="text-gray-500">Logo</div>
      <div className="flex gap-[110px]">
        <nav className="flex justify-center items-center space-x-[60px] text-gray-500">
          <a href="#" className="hover:text-purple">
            Trang chủ
          </a>
          <a href="#" className="hover:text-purple">
            Thi thử
          </a>
          <a href="#" className="hover:text-purple">
            Luyện thi
          </a>
          <a href="#" className="hover:text-purple">
            Liên hệ
          </a>
        </nav>

        <nav>
          {user ? (
            <div className="flex gap-8 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <IoSettingsOutline className="w-8 h-8" />
                  </button>
                </PopoverTrigger>
                <PopoverContent></PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button>
                    <LuUserRound className="w-8 h-8" />
                  </button>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-40">
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                  >
                    Log out
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                href="/auth/signup"
                className="text-purple font-bold underline"
              >
                ĐĂNG KÝ
              </Link>
              <Link
                href="/auth/login"
                className="bg-purple font-bold text-white px-4 py-2 rounded-full"
              >
                ĐĂNG NHẬP
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default NavBar
