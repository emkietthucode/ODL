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
import { useTranslations } from 'next-intl'
import useLanguage from '@/hooks/use-language'
import { useRouter } from 'next/navigation'
import { AiOutlineGlobal } from 'react-icons/ai'
import { cn } from '@/lib/utils'
import { FaCheck } from 'react-icons/fa6'

const NavBar = () => {
  const t = useTranslations('Navbar')
  const { locale, languages, setLocale } = useLanguage()
  const router = useRouter()

  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    await signOut()
    setUser(null)
  }

  const handleLanguageChange = (language: string) => {
    setLocale(language)
    router.refresh()
  }

  return (
    <div className="flex justify-around items-center p-4">
      <div className="text-gray-500">Logo</div>
      <div className="flex gap-[110px]">
        <nav className="flex justify-center items-center space-x-[60px] text-gray-500">
          <Link href="/" className="hover:text-purple">
            {t('homePage')}
          </Link>
          <Link href="/tests" className="hover:text-purple">
            {t('testPage')}
          </Link>
          <Link href="/learn" className="hover:text-purple">
            {t('learningPage')}
          </Link>
          <Link href="#" className="hover:text-purple">
            {t('contactPage')}
          </Link>
        </nav>

        <nav className="flex gap-3">
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
                    {t('logout')}
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                href="/auth/signup"
                className="text-purple font-bold underline uppercase"
              >
                {t('register')}
              </Link>
              <Link
                href="/auth/login"
                className="bg-purple font-bold text-white px-4 py-2 rounded-full uppercase"
              >
                {t('login')}
              </Link>
            </div>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <button className="w-10 h-10 p-1 hover:bg-gray-200 rounded-md">
                <AiOutlineGlobal className="w-full h-full" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 max-h-80">
              {languages.map((language, index) => (
                <button
                  onClick={() => handleLanguageChange(language.ky_hieu)}
                  key={index}
                  className={cn(
                    'w-full text-start my-3 text-gray-500 hover:text-black transition-colors flex items-center justify-between',
                    locale === language.ky_hieu && 'text-[#c4202b]'
                  )}
                >
                  <span>{language.ten_ngon_ngu}</span>{' '}
                  {locale === language.ky_hieu && (
                    <span>
                      <FaCheck />
                    </span>
                  )}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
