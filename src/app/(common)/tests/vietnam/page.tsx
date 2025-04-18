import ScrollToTopButton from '@/components/scroll-to-top-button'
import LearnCategory from '../../../../../public/images/f5-learn-category.svg'
import B1Car from '../../../../../public/images/f5-b1-car.svg'
import B2Car from '../../../../../public/images/f5-b2-car.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

const TestsCategoryPage = () => {
  const t = useTranslations('VietnamTestPage')
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
        <div className="w-full h-[350px] bg-custom-light-hover-blue flex justify-center">
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
                  className="font-medium w-[50%] self-end mx-auto uppercase"
                >
                  {t('startButton')}
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
                  className="font-medium w-[50%] self-end mx-auto uppercase"
                >
                  {t('startButton')}
                </Button>
              </div>
              <div
                className="bg-custom-light-blue rounded-2xl border-4 border-custom-normal-light-blue 
              flex flex-col h-[240px] w-[180px] 
              text-center items-center justify-around"
              >
                <div className="font-bold text-3xl">B1</div>
                <div className="text-sm font-normal w-[80 %]">
                  {t('b1Description')}
                </div>
                <Button
                  variant="main"
                  size="auto"
                  className="font-medium w-[50%] self-end mx-auto uppercase"
                >
                  {t('startButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[60%] flex flex-col my-10 gap-[64px]">
          <div className="flex justify-between gap-20 w-full">
            <Image src={B1Car} alt="" />
            <div className="flex flex-col justify-center text-left gap-5">
              <hr className="w-[150px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-5xl">B1</div>
              <div>{t('b1Description')}</div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px] uppercase"
              >
                {t('startButton')}
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-20 w-full">
            <div className="flex flex-col justify-center text-left gap-5">
              <hr className="w-[150px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-5xl">B2</div>
              <div>{t('b2Description')}</div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px] uppercase"
              >
                {t('startButton')}
              </Button>
            </div>
            <Image src={B2Car} alt="" />
          </div>
          <hr className="w-[90%] h-[2px] my-1 mx-auto bg-light-purple border-0 rounded dark:bg-light-purp"></hr>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[128px] justify-between w-[40%]">
              <div className="flex flex-col">
                <div className="font-bold text-5xl mb-[25px]">C</div>
                <div>{t('cDescription')}</div>
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px] uppercase"
              >
                {t('startButton')}
              </Button>
            </div>
            <div className="flex flex-col gap-[128px] justify-between w-[45%]">
              <div className="flex flex-col">
                <div className="font-bold text-5xl mb-[20px] uppercase">
                  {t('defTitle')}
                </div>
                <div>{t('defDescription')}</div>
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px] uppercase"
              >
                {t('startButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestsCategoryPage
