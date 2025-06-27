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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './ui/menubar'
import toast from 'react-hot-toast'
import { id } from 'date-fns/locale'

const prefix =
  'https://cgtsomijxwpcyqgznjqx.supabase.co/storage/v1/object/public/quoc_ky//'

const defaultFlag =
  'https://cgtsomijxwpcyqgznjqx.supabase.co/storage/v1/object/public/quoc_ky//Flag_of_the_United_Kingdom_(1-2).svg.png'

interface Nation {
  id: string
  locale: string
  flag: string
  name: string
  slug: string
  regions?: Nation[]
}

const NavBar = () => {
  const t = useTranslations('Navbar')
  const { locale, languages, setLocale } = useLanguage()
  const router = useRouter()
  const [userData, setUserData] = useState<NguoiDung | null>(null)
  const [nations, setNations] = useState<Nation[]>([])
  const [selectedNation, setSelectedNation] = useState<
    Nation | null | undefined
  >(null)

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

  useEffect(() => {
    const fetchNations = async () => {
      const { data, error } = await supabase.rpc('search_khu_vuc_proc', {
        search_text: '',
      })

      if (error) {
        toast.error('Error fetching regions')
      }
      const formattedNations = data.map((nation: any) => ({
        id: nation.id,
        locale: nation.ky_hieu,
        flag: nation.quoc_ky,
        name: nation.ten_khu_vuc,
        slug: nation.slug,
      }))

      const { data: stateData, error: stateError } = await supabase.rpc(
        'search_tieu_bang',
        {
          search_text: '',
        }
      )

      if (stateError) {
        toast.error('Error fetching states')
      }
      const formattedStates = stateData.map((state: any) => ({
        name: state.ten_khu_vuc,
        flag: state.quoc_ky,
        locale: state.ky_hieu,
        nation: state.quoc_gia,
        id: state.id,
      }))
      const nationsWithRegions = formattedNations.map((nation: any) => {
        const regions = formattedStates.filter(
          (state: any) => state.nation === nation.id
        )
        return {
          ...nation,
          regions: regions.length > 0 ? regions : undefined,
        }
      })

      setNations(nationsWithRegions)
    }

    fetchNations()
  }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setUserData(null)
  }

  const handleLanguageChange = (language: string) => {
    setLocale(language)
    router.refresh()
  }

  const handleNationChange = async (nation: Nation) => {
    setSelectedNation(nation)

    localStorage.setItem('nation', JSON.stringify(nation))
    localStorage.setItem('selectedCountry', nation.slug)
    if (user) {
      try {
        await supabase
          .from('nguoi_dung')
          .update({
            ma_khu_vuc: nation.id,
          })
          .eq('id', user.id)
      } catch (erro: any) {
        console.error('Error updating user nation:', erro)
        toast.error('Error updating nation')
      }
    }

    const { data, error } = await supabase
      .from('khu_vuc')
      .select(
        `
            *,
            ngon_ngu (
              id,
              ky_hieu
            )
          `
      )
      .eq('id', nation?.id)
    if (data) {
      setLocale(data[0].ngon_ngu?.ky_hieu)
    }

    router.refresh()
  }

  useEffect(() => {
    const fetchedNation = async () => {
      if (nations.length === 0) {
        return
      }
      if (!user) {
        const temp = JSON.parse(
          localStorage.getItem('nation') || '{}'
        ) as Nation
        if (Object.keys(temp).length > 0) {
          setSelectedNation(temp)
          localStorage.setItem('nation', JSON.stringify(temp))
          localStorage.setItem('selectedCountry', temp.slug)
        } else {
          const defaultNation = nations
            ? nations.find((n) => n.slug === 'vietnam')
            : null
          console.log(defaultNation)

          localStorage.setItem('nation', JSON.stringify(defaultNation))
          setSelectedNation(defaultNation)
          localStorage.setItem(
            'selectedCountry',
            defaultNation?.slug || 'vietnam'
          )
        }
      } else {
        const temp = JSON.parse(
          localStorage.getItem('nation') || '{}'
        ) as Nation
        if (Object.keys(temp).length > 0) {
          setSelectedNation(temp)
          localStorage.setItem('nation', JSON.stringify(temp))
          localStorage.setItem('selectedCountry', temp.slug)
        } else {
          const defaultNation = nations
            ? nations.find((n) => n.slug === 'vietnam')
            : null
          console.log(defaultNation)
          localStorage.setItem('nation', JSON.stringify(defaultNation))
          setSelectedNation(defaultNation)
          localStorage.setItem(
            'selectedCountry',
            defaultNation?.slug || 'vietnam'
          )
        }
      }
    }

    fetchedNation()
  }, [user, nations])

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
              {t('roadMap')}
            </Link>
            <Link href="/learning" className="hover:opacity-80">
              {t('learningPage')}
            </Link>
            <Link href="#" className="hover:opacity-80">
              {t('contactPage')}
            </Link>
          </nav>
          <nav className="flex gap-9 justify-end">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="p-0 w-8 h-4 cursor-pointer">
                  <Image
                    width={40}
                    height={20}
                    src={
                      selectedNation
                        ? prefix + selectedNation.flag
                        : defaultFlag
                    }
                    alt="flag"
                  />
                </MenubarTrigger>

                <MenubarContent>
                  {nations.map((nation, index) =>
                    nation.regions ? (
                      <MenubarSub key={index}>
                        <MenubarSubTrigger>{nation.name}</MenubarSubTrigger>
                        <MenubarSubContent>
                          {nation.regions.map((region, regionIndex) => (
                            <MenubarItem
                              onClick={() => handleNationChange(region)}
                              key={'region' + regionIndex}
                              className={cn(
                                region.id === selectedNation?.id
                                  ? 'bg-gray-200'
                                  : 'bg-auto'
                              )}
                            >
                              {region.name}
                            </MenubarItem>
                          ))}
                        </MenubarSubContent>
                      </MenubarSub>
                    ) : (
                      <MenubarItem
                        onClick={() => handleNationChange(nation)}
                        key={index}
                        className={cn(
                          nation.id === selectedNation?.id ? 'bg-gray-200' : ''
                        )}
                      >
                        {nation.name}
                      </MenubarItem>
                    )
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

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
