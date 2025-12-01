'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import Student from '../../../../../../../public/images/f6-student.svg'
import Overlay from '../../../../../../../public/images/f6-overlay.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Montserrat_Alternates } from 'next/font/google'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DeThi, HangBang } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['vietnamese'],
})

const TestsLicensePage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()
  const [tests, setTests] = useState<DeThi[]>([])
  const pathname = usePathname()
  const t = useTranslations('ChooseTestPage')

  useEffect(() => {
    const fetchData = async () => {
      const { data: licenseData, error: licenseError } = await supabase
        .from('hang_bang')
        .select()
        .ilike('ten_hang_bang', `${params.licenseName.toUpperCase()}%`)
      if (licenseError || !licenseData) {
        console.log(licenseError)
        return toast.error('Lấy dữ liệu hạng bằng không thành công')
      }
      console.log(params.licenseName.toUpperCase())
      setLicense(licenseData[0])
      const { data: testsData, error: testsError } = await supabase.rpc(
        'get_de_thi_by_hang_bang_id',
        {
          hang_bang_id: licenseData[0].id,
        }
      )
      if (testsError) {
        console.log(testsError)
        return toast.error('Lấy dữ liệu đề thi không thành công')
      }
      setTests(testsData)
    }

    fetchData()
  }, [license, params])

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col gap-[20px] justify-between items-center h-full w-[85%]">
          <div className="flex justify-start relative w-[90%]">
            <div className="flex flex-col gap-6 z-20 mt-5">
              <div className="text-purple text-3xl font-bold uppercase">
                {`${t('title')}: ${license?.ten_hang_bang || ''}`}
              </div>
              <div className="w-[60%] font-light text-sm">
                {license?.ten_hang_bang.startsWith('RIDER')
                  ? t('riderDescription')
                  : license?.ten_hang_bang.startsWith('CAR')
                  ? t('carDescription')
                  : ''}
              </div>
            </div>
          </div>

          <div className="relative w-full mt-[50px]">
            <Image
              src={Overlay}
              alt=""
              className="absolute z-0 -top-[250px] -right-[110px]"
            />
            <div className="bg-light-purple-admin w-[1214px] h-[192px] rounded-3xl flex justify-center items-center relative z-20 ">
              <div className="w-[70%] flex justify-between items-center">
                <Image
                  src={Student}
                  alt=""
                  className="absolute z-20 top-[100px] -left-[30px]"
                />

                <div className="flex flex-col gap-[16px] w-[65%] justify-center">
                  <div className="text-xl font-medium">{t('readyTitle')}</div>
                  <div className="font-light text-sm">
                    {t('testDescription')}
                  </div>
                </div>

                {tests.length > 0 ? (
                  <Link
                    href={`${pathname}/${
                      tests[Math.floor(Math.random() * tests.length)].id
                    }`}
                  >
                    <Button
                      variant="main"
                      size="auto"
                      className="rounded-xl shadow-xl text-xl font-medium w-[191px] h-[44px] uppercase bg-custom-dark-violet"
                    >
                      {t('randomButton')}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="main"
                    size="auto"
                    className="rounded-xl shadow-xl text-xl font-medium w-[191px] h-[44px] uppercase bg-custom-dark-violet opacity-50 cursor-not-allowed"
                    disabled
                  >
                    {t('randomButton')}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[32px] items-center w-full">
            <div className="font-semibold">{t('or')}</div>
            <div className="text-purple text-2xl font-medium uppercase">
              {t('providedTitle')}
            </div>
            <div className="mb-[128px] mt-[16px] w-[60%] flex flex-wrap gap-10 justify-center">
              {tests.map((test, index) => (
                <Link key={index} href={`${pathname}/${test.id}`}>
                  <Button
                    className={`${montserratAlternates.className} 
                    rounded-full
                    uppercase
                    text-white 
                    font-bold 
                    text-xl 
                    drop-shadow-lg
                    bg-custom-normal-light-blue
                    hover:bg-blue-400/80
                    text-center
                    w-full
                    min-w-[115px]
                    h-[49px]`}
                  >
                    {t('exam')} {index + 1}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-[200px] bg-custom-light-hover-blue flex justify-center">
          <div className="w-[75%] h-full flex justify-between items-center">
            <div className="flex flex-col gap-10 w-[70%]">
              <div className="text-purple text-3xl font-bold">
                {t('notReadyTitle')}
              </div>
              <div>
                {t('notReadyDescriptionP1')} {license?.ten_hang_bang}.{' '}
                {t('notReadyDescriptionP2')}
              </div>
            </div>
            <Link href={`/learn/vietnam/${license?.ten_hang_bang}`}>
              <Button
                variant="main"
                size="auto"
                className="drop-shadow-lg font-medium text-xl w-full min-w-[189px] h-[53px] bg-custom-normal-violet rounded-2xl uppercase"
              >
                {t('learningButton')} {license?.ten_hang_bang}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestsLicensePage
