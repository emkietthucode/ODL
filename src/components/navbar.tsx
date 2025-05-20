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
import Image from 'next/image'
import { FaRegCircleUser } from 'react-icons/fa6'
import Logo from '../../public/images/Logo.png'
import { NguoiDung } from '@/types/types'
import { useState, useEffect } from 'react'
import supabase from '@/utils/supabase/supabase'

const defaultFlag =
  'https://cgtsomijxwpcyqgznjqx.supabase.co/storage/v1/object/public/quoc_ky//Flag_of_the_United_Kingdom_(1-2).svg.png'

const NavBar = () => {
  const t = useTranslations('Navbar')
  const { locale, languages, setLocale } = useLanguage()
  const router = useRouter()
  const [userData, setUserData] = useState<NguoiDung | null>(null)

  const { user, setUser } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('nguoi_dung')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.log('Error fetching user data:', error)
        } else {
          setUserData(data)
        }
      }
    }

    fetchUserData()
  }, [user])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setUserData(null)
  }

  const handleLanguageChange = (language: string) => {
    setLocale(language)
    router.refresh()
  }

  const selectedLanguage = languages.find((lang) => lang.ky_hieu === locale)

  return (
    <div className="h-10 bg-custom-light-violet flex justify-center text-purple">
      <div className="max-w-[1080px] w-full flex justify-start items-center gap-[60px]">
        <Image src={Logo} alt="logo" width={40} height={40} />
        <div className="flex gap-[60px] text-[16px] justify-start w-full">
          <nav className="flex w-full items-center space-x-[60px] ">
            <Link href="/" className="hover:opacity-80">
              {t('homePage')}
            </Link>
            <Link href="/tests" className="hover:opacity-80">
              {t('testPage')}
            </Link>
            <Link href="/learning-path" className="hover:opacity-80">
              {t('learningPage')}
            </Link>
            <Link href="#" className="hover:opacity-80">
              {t('contactPage')}
            </Link>
          </nav>
          <nav className="flex gap-9 justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-10 h-8 p-1 hover:bg-gray-200 rounded-md">
                  {/* <AiOutlineGlobal className="w-full h-full" /> */}
                  <Image
                    width={40}
                    height={20}
                    src={selectedLanguage?.quoc_ky || defaultFlag}
                    alt="flag"
                  />
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
            {user ? (
              <div className="flex gap-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center text-purple hover:opacity-80">
                      <span className="text-[12px] w-20 items-center underline">
                        Tài khoản
                      </span>
                      <FaRegCircleUser className="w-6 h-6" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-40">
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                    >
                      {t('logout')}
                    </Button>
                    {userData?.vai_tro === 'admin' && (
                      <Button
                        onClick={() => router.push('/admin')}
                        className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                      >
                        {t('adminPanel')}
                      </Button>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="flex gap-2 items-center flex-1">
                <Link
                  href="/auth/signup"
                  className="text-[10px] w-20 h-6 p-1 text-center text-purple border-[1px] rounded-[10px] border-purple bg-white font-bold  uppercase"
                >
                  {t('register')}
                </Link>
                <Link
                  href="/auth/login"
                  className="text-[10px] w-20 h-6 p-1 text-center text-white border-[1px] rounded-[10px] border-purple bg-purple font-bold  uppercase"
                >
                  {t('login')}
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavBar
