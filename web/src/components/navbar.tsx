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
import { usePathname, useRouter } from 'next/navigation'
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

const patterns = [
  /^\/tests\/vietnam\/[^/]+\/[^/]+$/, // /tests/vietnam/[licenseName]/testId
  /^\/tests\/australia\/[^/]+\/[^/]+\/[^/]+$/, // /tests/australia/[stateName]/[licenseName]/testId
  /^\/learning-path\/vietnam\/[^/]+\/[^/]+\/[^/]+$/, // /learning-path/vietnam/[licenseName]/[chapterId]/[testId]
  /^\/learning-path\/australia\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/, // /learning-path/australia/[stateName]/[licenseName]/[chapterId]/[testId]
]

const fixedNations = [
  {
    id: '6f784311-f8b9-48ce-a202-ac32e5877057',
    flag: 'quoc-ky-6f784311-f8b9-48ce-a202-ac32e5877057',
    name: 'Úc',
    slug: null,
    locale: 'en',
    regions: [
      {
        name: 'Australian Capital Territory',
        flag: 'quoc-ky-2d956829-99d0-47c7-a904-b75eae337465',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: '2d956829-99d0-47c7-a904-b75eae337465',
        locale: 'en',
      },
      {
        name: 'New South Wales',
        flag: 'quoc-ky-65fd7793-a86c-4fb1-b505-c072f0f9fa9c',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: 'australia/new-south-wales',
        id: '65fd7793-a86c-4fb1-b505-c072f0f9fa9c',
        locale: 'en',
      },
      {
        name: 'Northern Territory',
        flag: 'quoc-ky-2badeacd-6432-4ae6-8b84-a3f0dcc15677',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: '2badeacd-6432-4ae6-8b84-a3f0dcc15677',
        locale: 'en',
      },
      {
        name: 'Queensland',
        flag: 'quoc-ky-ff96d857-4128-4192-9a60-c7499ee635c1',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: 'ff96d857-4128-4192-9a60-c7499ee635c1',
      },
      {
        name: 'South Australia',
        flag: 'quoc-ky-b98d4b9e-3866-4d07-870f-2f5c6f56bb29',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: 'b98d4b9e-3866-4d07-870f-2f5c6f56bb29',
      },
      {
        name: 'Tasmania',
        flag: 'quoc-ky-d1e35568-8086-4677-8196-529babff7018',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: 'd1e35568-8086-4677-8196-529babff7018',
        locale: 'en',
      },
      {
        name: 'Victoria',
        flag: 'quoc-ky-69e876c6-94b2-456e-9861-f59e079e89e9',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: '69e876c6-94b2-456e-9861-f59e079e89e9',
        locale: 'en',
      },
      {
        name: 'Western Australia',
        flag: 'quoc-ky-70b28264-96e1-41e5-8d0d-104c7d3de1d4',
        nation: '6f784311-f8b9-48ce-a202-ac32e5877057',
        slug: null,
        id: '70b28264-96e1-41e5-8d0d-104c7d3de1d4',
        locale: 'en',
      },
    ],
  },
  {
    id: 'd078c695-a8b8-4bab-988f-f5bb2094b0e4',
    flag: 'quoc-ky-d078c695-a8b8-4bab-988f-f5bb2094b0e4',
    name: 'Việt Nam',
    slug: 'vietnam',
    locale: 'vn',
  },
]

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
  const [nations, setNations] = useState<any[]>(fixedNations)
  const [selectedNation, setSelectedNation] = useState<
    Nation | null | undefined
  >(null)

  const { user, setUser } = useAuth()
  const pathname = usePathname()

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

  // useEffect(() => {
  //   const fetchNations = async () => {
  //     const { data, error } = await supabase.rpc('search_khu_vuc_proc', {
  //       search_text: '',
  //     })

  //     if (error) {
  //       toast.error('Error fetching regions')
  //     }
  //     const formattedNations = data.map((nation: any) => ({
  //       id: nation.id,
  //       locale: nation.ky_hieu,
  //       flag: nation.quoc_ky,
  //       name: nation.ten_khu_vuc,
  //       slug: nation.slug,
  //     }))

  //     const { data: stateData, error: stateError } = await supabase.rpc(
  //       'search_tieu_bang',
  //       {
  //         search_text: '',
  //       }
  //     )

  //     if (stateError) {
  //       toast.error('Error fetching states')
  //     }
  //     const formattedStates = stateData.map((state: any) => ({
  //       name: state.ten_khu_vuc,
  //       flag: state.quoc_ky,
  //       locale: state.ky_hieu,
  //       nation: state.quoc_gia,
  //       slug: state.slug,
  //       id: state.id,
  //     }))
  //     const nationsWithRegions = formattedNations.map((nation: any) => {
  //       const regions = formattedStates.filter(
  //         (state: any) => state.nation === nation.id
  //       )
  //       return {
  //         ...nation,
  //         regions: regions.length > 0 ? regions : undefined,
  //       }
  //     })

  //     console.log('Fetched nations:', nationsWithRegions)

  //     setNations(nationsWithRegions)
  //   }

  //   fetchNations()
  // }, [])

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setUserData(null)
    localStorage.removeItem('selectedCountry')
    localStorage.removeItem('nation')
    localStorage.removeItem('user')
    setLocale('vn')

    router.push('/')
  }

  const handleNationChange = async (nation: Nation) => {
    const currentSlug = localStorage.getItem('selectedCountry')

    let currentPath = pathname

    localStorage.setItem('nation', JSON.stringify(nation))
    localStorage.setItem('selectedCountry', nation.slug)
    setLocale(nation.locale)

    setSelectedNation(nation)

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

    if (currentPath.includes(currentSlug || 'not-found')) {
      currentPath = currentPath.replace(
        currentSlug ? currentSlug : 'not found',
        nation.slug
      )

      currentPath = currentPath.split(nation.slug)[0] + nation.slug

      router.push(currentPath)
      router.refresh()
    } else {
      console.log('into')
      router.refresh()
    }
  }

  useEffect(() => {
    const fetchedNation = async () => {
      if (!user) {
        const temp = JSON.parse(
          localStorage.getItem('nation') || '{}'
        ) as Nation
        if (Object.keys(temp).length > 0) {
          setSelectedNation(temp)
          localStorage.setItem('nation', JSON.stringify(temp))
          localStorage.setItem('selectedCountry', temp.slug)
          setLocale(temp.locale)
        } else {
          const defaultNation = nations
            ? nations.find((n) => n.slug === 'vietnam')
            : null

          localStorage.setItem('nation', JSON.stringify(defaultNation))
          setSelectedNation(defaultNation)
          localStorage.setItem(
            'selectedCountry',
            defaultNation?.slug || 'vietnam'
          )
          setLocale('vn')
        }
      } else {
        const temp = JSON.parse(
          localStorage.getItem('nation') || '{}'
        ) as Nation
        if (Object.keys(temp).length > 0) {
          setSelectedNation(temp)
          localStorage.setItem('nation', JSON.stringify(temp))
          localStorage.setItem('selectedCountry', temp.slug)
          setLocale(temp.locale)
        } else {
          const defaultNation = nations
            ? nations.find((n) => n.slug === 'vietnam')
            : null
          localStorage.setItem('nation', JSON.stringify(defaultNation))
          setSelectedNation(defaultNation)
          localStorage.setItem(
            'selectedCountry',
            defaultNation?.slug || 'vietnam'
          )
          setLocale('vn')
        }
      }
    }

    fetchedNation()
  }, [userData])

  const pathMatch = () => patterns.some((regex) => regex.test(pathname))

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
            <Link href="/learn" className="hover:opacity-80">
              {t('learningPage')}
            </Link>
            <Link href="/contact" className="hover:opacity-80">
              {t('contactPage')}
            </Link>
          </nav>
          <nav className="flex gap-9 justify-end">
            {!pathMatch() && (
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
                            {nation.regions.map(
                              (region: any, regionIndex: number) => (
                                <MenubarItem
                                  onClick={
                                    region.slug === 'australia/new-south-wales'
                                      ? () => handleNationChange(region)
                                      : () => {}
                                  }
                                  key={'region' + regionIndex}
                                  className={cn(
                                    region.id === selectedNation?.id
                                      ? 'bg-gray-200'
                                      : 'bg-auto',
                                    region.slug !==
                                      'australia/new-south-wales' &&
                                      'opacity-50'
                                  )}
                                >
                                  {region.name}
                                </MenubarItem>
                              )
                            )}
                          </MenubarSubContent>
                        </MenubarSub>
                      ) : (
                        <MenubarItem
                          onClick={() => handleNationChange(nation)}
                          key={index}
                          className={cn(
                            nation.id === selectedNation?.id
                              ? 'bg-gray-200'
                              : ''
                          )}
                        >
                          {nation.name}
                        </MenubarItem>
                      )
                    )}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}

            {user ? (
              <div className="flex gap-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center text-purple hover:opacity-80">
                      <FaRegCircleUser className="w-6 h-6" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-40">
                    <Button
                      onClick={() => router.push('/statistics/general')}
                      className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                    >
                      {t('statistics')}
                    </Button>
                    <Button
                      onClick={() => router.push('/profile')}
                      className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                    >
                      {t('profile')}
                    </Button>
                    {userData?.vai_tro === 'admin' && (
                      <Button
                        onClick={() => router.push('/admin')}
                        className="w-full bg-transparent hover:bg-[#888] outline-none text-black border-none shadow-none "
                      >
                        {t('adminPanel')}
                      </Button>
                    )}

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
