'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import Student from '../../../../../../public/images/f6-student.svg'
import Overlay from '../../../../../../public/images/f6-overlay.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Montserrat_Alternates } from 'next/font/google'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DeThi, HangBang } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['vietnamese'],
})

const TestsLicensePage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()
  const [tests, setTests] = useState<DeThi[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('ChooseTestPage')

  useEffect(() => {
    const fetchData = async () => {
      const { data: licenseData, error: licenseError } = await supabase
        .from('hang_bang')
        .select()
        .eq('ten_hang_bang', params.licenseName.toUpperCase())
      if (licenseError || !licenseData) {
        console.log(licenseError)
        return toast.error('Lấy dữ liệu hạng bằng không thành công')
      }
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
        <div className="flex flex-col gap-[32px] justify-between items-center h-full w-[60%]">
          <div className="flex justify-start relative w-[90%]">
            <div className="flex flex-col gap-10 z-20 mt-20">
              <div className="text-purple text-5xl font-semibold uppercase">
                {`${t('title')}: ${license?.ten_hang_bang || ''}`}
              </div>
              <div className="w-[60%]">{license?.mo_ta_hang_bang}</div>
            </div>
          </div>

          <div className="relative w-full mt-[100px]">
            <Image
              src={Overlay}
              alt=""
              className="absolute z-0 -top-[350px] -right-[110px] opacity-50"
            />
            <div className="bg-light-purple-admin w-full h-[350px] rounded-3xl flex justify-center items-center relative z-20 ">
              <div className="w-[80%] flex justify-between items-center">
                <Image
                  src={Student}
                  alt=""
                  className="absolute z-20 -top-[105px] -left-[30px]"
                />

                <div className="flex flex-col gap-[32px] w-[60%] justify-center">
                  <div className="text-2xl font-medium">{t('readyTitle')}</div>
                  <div>{t('testDescription')}</div>
                </div>

                <Button
                  variant="main"
                  size="auto"
                  className="rounded-xl shadow-xl font-medium w-[150px] h-full"
                >
                  {t('randomButton')}
                </Button>
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
                <Button
                  key={index}
                  className={`${montserratAlternates.className} 
                  rounded-xl 
                  text-white 
                  font-bold 
                  text-2xl 
                  bg-blue-400
                  hover:bg-blue-400/80
                  text-center
                  w-[150px]
                  h-[45px]`}
                  onClick={() => router.push(`${pathname}/${test.id}`)}
                >
                  {t('exam')} {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-blue-100/40 flex justify-center py-20">
          <div className="w-[60%] h-full flex justify-between items-center">
            <div className="flex flex-col gap-10 w-[70%]">
              <div className="text-purple text-3xl font-semibold">
                {t('notReadyTitle')}
              </div>
              <div>
                {t('notReadyDescriptionP1')} {license?.ten_hang_bang}.{' '}
                {t('notReadyDescriptionP2')}
              </div>
            </div>
            <Button
              variant="main"
              size="auto"
              className="font-medium w-[150px]"
              onClick={() =>
                router.push(`/learn/vietnam/${license?.ten_hang_bang}`)
              }
            >
              {t('learningButton')} {license?.ten_hang_bang}
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestsLicensePage
