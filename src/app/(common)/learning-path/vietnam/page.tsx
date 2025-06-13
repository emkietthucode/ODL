'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import LearnCategory from '../../../../../public/images/f5-learn-category.svg'
import ThreeWhiteDot from '../../../../../public/images/three-white-dot.svg'
import BCar from '../../../../../public/images/F5BCar.svg'
import C1Car from '../../../../../public/images/F5C1Car.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

function VietnameRoadmap() {
  const t = useTranslations('VietnamTestPage')
  const router = useRouter()
  const pathname = usePathname()

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col h-[275px] w-[75%]">
          <div className="flex justify-start relative">
            <div className="w-[72%] flex flex-col z-20 mt-2">
              <hr className="w-20 my-3 h-1 bg-purple border-0 rounded-sm" />
              <div className="text-purple text-3xl font-semibold">
                {t('title')}
              </div>
              <div className="my-3 text-sm leading-2 w-[90%]">
                {t('description')}
              </div>
            </div>
            <Image
              className="hidden xl:inline-block absolute z-10 right-14 top-[20px] "
              src={LearnCategory}
              alt=""
              width={240}
              height={340}
            />
          </div>
          <hr className="h-px my-5 bg-gray-400 border-0 dark:bg-gray-700" />
          <div className="uppercase mt-auto font-semibold text-2xl text-purple pb-2">
            {t('licenseClasses')}
          </div>
        </div>
        <div className="w-full h-[350px] bg-custom-light-hover-blue flex justify-center relative">
          <Image
            src={ThreeWhiteDot}
            alt=""
            className="absolute top-0 left-[700px] w-[95%] h-[80%]"
          />
          <div className="w-[60%] h-full flex flex-col justify-around items-center">
            <div className="flex flex-col text-center w-[25%]">
              <div className="text-xl text-gray-400 font-medium uppercase">
                {t('motorbikes')}
              </div>
              <div className="text-sm font-light">
                {`(${t('vehicle_wheels')})`}
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div
                className="bg-custom-light-blue rounded-2xl border-4 border-custom-normal-light-blue 
              flex flex-col h-[240px] w-[180px] 
              text-center items-center justify-around"
              >
                <div className="font-bold text-3xl">A1</div>
                <div className="text-sm font-normal w-[70%]">
                  {t('a1Description')}
                </div>
                <Button
                  variant="main"
                  size="auto"
                  className="font-medium max-w-full self-end mx-auto uppercase"
                  onClick={() => router.push(pathname + '/a1')}
                >
                  {t('learnButton')}
                </Button>
              </div>
              <div
                className="bg-custom-light-blue rounded-2xl border-4 border-custom-normal-light-blue 
              flex flex-col h-[240px] w-[180px] 
              text-center items-center justify-around"
              >
                <div className="font-bold text-3xl">A</div>
                <div className="text-sm font-normal">{t('aDescription')}</div>
                <Button
                  variant="main"
                  size="auto"
                  className="font-medium max-w-full self-end mx-auto uppercase"
                  onClick={() => router.push(pathname + '/a')}
                >
                  {t('learnButton')}
                </Button>
              </div>
              <div
                className="bg-custom-light-blue rounded-2xl border-4 border-custom-normal-light-blue 
              flex flex-col h-[240px] w-[180px] 
              text-center items-center justify-around"
              >
                <div className="font-bold text-3xl">B1</div>
                <div className="text-sm font-normal w-[80%]">
                  {t('b1Description')}
                </div>
                <Button
                  variant="main"
                  size="auto"
                  className="font-medium max-w-full self-end mx-auto uppercase"
                  onClick={() => router.push(pathname + '/b1')}
                >
                  {t('learnButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[75%] flex flex-col gap-[64px] my-4">
          <div className="flex justify-between gap-20 w-full">
            <div className="w-[50%] flex justify-center">
              <Image src={BCar} alt="" />
            </div>
            <div className="w-[50%] flex flex-col justify-center text-left gap-5">
              <hr className="w-[100px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-4xl">B</div>
              <div className="text-sm font-light">{t('bDescription')}</div>
              <Button
                variant="main"
                size="auto"
                className="font-medium uppercase  max-w-40"
                onClick={() => router.push(pathname + '/b')}
              >
                {t('learnButton')}
              </Button>
            </div>
          </div>
          <div className="w-full flex justify-between gap-20">
            <div className="w-[50%] flex flex-col justify-center text-left gap-5">
              <hr className="w-[100px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-4xl">C1</div>
              <div>{t('c1Description')}</div>
              <Button
                variant="main"
                size="auto"
                className="font-medium uppercase max-w-[200px]"
                onClick={() => router.push(pathname + '/c1')}
              >
                {t('learnButton')}
              </Button>
            </div>
            <div className="w-[50%] flex justify-center">
              <Image src={C1Car} alt="" />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default VietnameRoadmap
