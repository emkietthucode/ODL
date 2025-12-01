'use client'
import F11Studying from '../../../../../../public/images/f11.1.svg'
import F11Overlay from '../../../../../../public/images/f11Overlay.svg'
import F11LearningCardIcon1 from '../../../../../../public/images/f11LearningCardIcon1.svg'
import F11LearningCardIcon2 from '../../../../../../public/images/f11LearningCardIcon2.svg'
import F11LearningCardIcon3 from '../../../../../../public/images/f11LearningCardIcon3.svg'
import F11LearningCardIcon4 from '../../../../../../public/images/f11LearningCardIcon4.svg'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HangBang } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import LearningCard from '@/components/learning-card'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const LearnLicensePage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('LearningOverall')

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
    }

    fetchData()
  }, [license, params])

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full">
        <div className="flex relative w-full max-w-[1080px]">
          <div className="flex flex-col gap-4 z-20 mt-20">
            <div className="w-20 h-[3px] bg-custom-normal-active-violet rounded-full"></div>
            <div className="text-purple text-[28px] font-semibold uppercase">
              {`${t('title')}: ${license?.ten_hang_bang}`}
            </div>
            <div className="max-w-[612px] text-sm">
              {license?.mo_ta_hang_bang}
            </div>
          </div>
        </div>

        <div className="w-full h-[440px] bg-custom-violet mt-[96px] flex justify-center items-center relative">
          <div className="flex w-[1080px] items-center justify-between h-full ">
            <div className="flex flex-col gap-[50px] justify-center h-full">
              <div className="font-bold text-3xl text-white">
                {t('learningPathTitle')}
              </div>
              <div className="font-medium text-white text-sm w-[480px]">
                {t('learningPathDescription')}
              </div>
              <Button
                className="
                bg-white hover:bg-white/90
                text-custom-violet 
                  rounded-none 
                  w-[135px] h-[49px] 
                  font-bold text-2xl
                  mx-auto
                "
                onClick={() =>
                  router.push(`/learning-path/${params.licenseName}`)
                }
              >
                {t('startButton')}
              </Button>
            </div>
            <Image src={F11Studying} alt="" width={371} height={234} />
          </div>
          <Image
            src={F11Overlay}
            alt=""
            className="absolute -top-[350px] right-[0px] opacity-40"
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-[128px]">
          <div className="flex flex-col gap-5 justify-center items-center my-[128px] ">
            <div className="text-[28px] font-bold text-blue-400">
              {t('learningTitle')}
            </div>
            <div className="text-sm text-center max-w-[632px]">
              {t('learningDescription')}
            </div>
          </div>
          <div className="flex flex-wrap gap-[45px] gap-y-[64px] justify-center items-center w-full">
            <Link href="/">
              <LearningCard
                icon={F11LearningCardIcon2}
                title={t('trafficSignsTitle')}
                desc={t('trafficSignsDescription')}
              />
            </Link>
            <Link href={`/learn/vietnam/motorbike/critical-questions`}>
              <LearningCard
                icon={F11LearningCardIcon3}
                title={t('criticalQuestionsTitle')}
                desc={t('criticalQuestionsDescription')}
              />
            </Link>
            <Link href="/missed-questions">
              <LearningCard
                icon={F11LearningCardIcon4}
                title={t('reviewTitle')}
                desc={t('reviewDescription')}
              />
            </Link>
          </div>
        </div>
        <div className="w-full h-full bg-blue-100/40 flex justify-center py-20">
          <div className="w-[1080px] h-full flex justify-between items-center gap-[251px]">
            <div className="flex flex-col gap-10 w-full">
              <div className="text-purple text-3xl font-bold">
                {t('readyToTest')}
              </div>
              <div className="text-sm">{t('readyToTestDescription')}</div>
            </div>
            <Button
              variant="main"
              size="auto"
              className="font-medium w-[150px]"
              onClick={() =>
                router.push(`/tests/vietnam/${license?.ten_hang_bang}`)
              }
            >
              {t('readyToTestButton')} {license?.ten_hang_bang}
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default LearnLicensePage
