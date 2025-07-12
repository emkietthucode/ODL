'use client'

import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import HomeImage from '../../../public/images/Home.svg'
import Guest from '../../../public/images/guest-avatar.png'
import Phone from '../../../public/images/phone.svg'
import Path from '../../../public/images/path.svg'
import GooglePlay from '../../../public/images/google-play.svg'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Vollkorn, Montserrat_Alternates, Poppins } from 'next/font/google'
import { IoMdArrowDroprightCircle } from 'react-icons/io'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FaBookOpen } from 'react-icons/fa'
import { IoPencilSharp } from 'react-icons/io5'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { PiListBold } from 'react-icons/pi'
import { Avatar } from '@radix-ui/react-avatar'
import AvatarSample from '../../../public/images/image_32.png'
import CardSample from '../../../public/images/rafiki.svg'
import Traffic from '../../../public/images/traffic.svg'
import Sign from '../../../public/images/sign.svg'
import WrongQuestions from '../../../public/images/wrong-questions.svg'
import Fly from '../../../public/images/fly.svg'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { GoClock } from 'react-icons/go'
import { PiTreeStructureLight } from 'react-icons/pi'
import { TbStars } from 'react-icons/tb'

const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-vollkorn',
})

const montserratAlter = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat-alter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

const Home = () => {
  const t = useTranslations('HomePage')
  const [index, setIndex] = useState<number>(0)

  const [locale, setLocale] = useState<string>('vietnam')
  const carousels = [
    {
      title: t('learnCritical'),
      description: t('learnCriticalDescription'),
      image: Traffic,
    },
    {
      title: t('learnSigns'),
      description: t('learnSignsDescription'),
      image: Sign,
    },
    {
      title: t('challengeBank'),
      image: WrongQuestions,
    },
  ]

  useEffect(() => {
    setLocale(
      typeof window !== 'undefined'
        ? window.localStorage.getItem('selectedCountry') || 'vietnam'
        : 'vietnam'
    )
  }, [])
  return (
    <main className="text-left w-full  bg-white">
      <div className=" bg-white max-w-[1200px] mx-auto left-0 p-10">
        <h1 className="text-xl font-bold text-[#8070B8] uppercase">
          online driving license
        </h1>
        <p
          className={`mt-10 text-[40px] font-extrabold max-w-[391px] ${vollkorn.className}`}
        >
          {t('quote')}
        </p>

        <p className="max-w-[470px] mt-[26px]">{t('description')}</p>
        <div className="flex mt-[90px] gap-[100px] items-center">
          <Link href="/learning-path">
            <Button
              variant="main"
              size="auto"
              className="text-[28px] h-[54px] p-[10px] rounded-full shadow-lg min-w-40"
            >
              {t('learnButton')}
            </Button>
          </Link>

          <Link href="/tests">
            <button className="flex items-center gap-[17px]">
              <IoMdArrowDroprightCircle size={67} fill="#DF6951" />

              <span className="text-[#686D77] text-[17px]">
                {t('testButton')}
              </span>
            </button>
          </Link>
        </div>

        <div className="absolute top-24 right-0 h-[550px] w-[680px] object-right">
          <Image src={HomeImage} alt="Landing image" />
        </div>
      </div>

      <div className="pt-[38px] mt-6">
        <p className="w-full text-center uppercase font-semibold text-[#5E6282]">
          {t('testing')}
        </p>
        <p
          className={`w-full text-center text-4xl font-bold mt-[6px] ${montserratAlter.className}`}
        >
          {t('commonLicense')}
        </p>

        {locale === 'vietnam' && (
          <div className="mt-16 flex w-full justify-center gap-[86px]">
            <Link href="/tests/vietnam/a1">
              <Card className="w-[267px] h-[308px] rounded-[36px] px-[50px] py-20 relative">
                <CardHeader className="mb-8 p-0">
                  <h1 className="w-full leading-[48px]  text-center text-[48px] font-bold">
                    A1
                  </h1>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-center w-full max-w-[167px] mx-auto">
                    {t('a1Description')}
                  </p>
                </CardContent>
                <div className="bg-[#FF9ABB] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-[#DF5753] absolute left-1/2 -top-[30px] -translate-x-1/2">
                  1
                </div>
              </Card>
            </Link>

            <Link href="/tests/vietnam/a">
              <Card className="w-[267px] h-[308px] rounded-[36px] px-[28px] pt-20 relative">
                <CardHeader className="mb-8 p-0">
                  <p className="w-full text-center text-[48px] leading-[48px] font-bold">
                    A
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-center w-full  mx-auto">
                    {t('aDescription')}
                  </p>
                </CardContent>
                <div className="bg-[#BBE7D9] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-[#11513C] absolute left-1/2 -top-[30px] -translate-x-1/2">
                  2
                </div>
              </Card>
            </Link>

            <Link href="/tests/vietnam/b1">
              <Card className="w-[267px] h-[308px] rounded-[36px] py-20 relative">
                <CardHeader className="mb-8 p-0">
                  <h1 className="w-full text-center leading-[48px]  text-[48px] font-bold">
                    B1
                  </h1>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-center w-full max-w-[207px] mx-auto">
                    {t('b1Description')}
                  </p>
                </CardContent>
                <div className="bg-[#D6B07A] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-white absolute left-1/2 -top-[30px] -translate-x-1/2">
                  3
                </div>
              </Card>
            </Link>
          </div>
        )}

        {locale !== 'vietnam' && (
          <div className="mt-16 flex w-full justify-center gap-[86px]">
            <Link href="/tests/australia/new-south-wales/rider">
              <Card className="w-[360px] h-[308px] rounded-[36px]  py-20 relative">
                <CardHeader className="mb-8 p-0">
                  <h1 className="w-full leading-[48px]  text-center text-[32px] font-bold">
                    RIDER (R)
                  </h1>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-center w-full mx-auto px-2">
                    {t('riderDescription')}
                  </p>
                </CardContent>
                <div className="bg-[#FF9ABB] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-[#DF5753] absolute left-1/2 -top-[30px] -translate-x-1/2">
                  1
                </div>
              </Card>
            </Link>

            <Link href="/tests/australia/new-south-wales/car">
              <Card className="w-[360px] h-[308px] rounded-[36px] px-[28px] pt-20 relative">
                <CardHeader className="mb-8 p-0">
                  <p className="w-full text-center text-[32px] leading-[48px] font-bold">
                    CAR (C)
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-center w-full px-2  mx-auto">
                    {t('carDescription')}
                  </p>
                </CardContent>
                <div className="bg-[#BBE7D9] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-[#11513C] absolute left-1/2 -top-[30px] -translate-x-1/2">
                  2
                </div>
              </Card>
            </Link>
          </div>
        )}
      </div>

      <div className="w-[980px] mt-[100px] mb-[65px] h-[3px] bg-[#E0E0E0] mx-auto"></div>

      <div className="flex gap-[90px] mb-[360px]">
        <div className="relative min-w-[546px]">
          <Card
            className={cn(
              'w-[382px]  p-8 absolute transition-all duration-300 left-20',
              index !== 0 && 'ml-8'
            )}
          >
            <CardHeader className="p-0">
              <div className="w-[153px] h-[38px] rounded-full bg-[#CDD8FF] px-5 py-2 text-[#717FB0]">
                {index + 1}
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-8 h-[300px]">
              <p className="text-[31px] font-semibold text-[#55578D] transition-all duration-500">
                {carousels[index].title}
              </p>
              <p className="mt-4 text-sm max-w-[279px] transition-all duration-500">
                {carousels[index].description}
              </p>
              <Image
                src={carousels[index].image}
                alt="traffic"
                className="mt-[34px] mx-auto transition-all duration-500 ease-in"
              />
            </CardContent>

            <Card className="w-[300px] h-24 absolute left-1/2 ">
              <CardHeader className="p-0 h-full">
                <div className="flex items-center h-full">
                  <Link href="/learn" className="relative w-full h-full ml-8">
                    <div className="w-12 h-12 rounded-full bg-[#D8F9ED] top-1/2 -translate-y-1/2 absolute"></div>
                    <Image
                      src={Fly}
                      alt="fly"
                      width={80}
                      height={72}
                      className="absolute -left-4 top-1/2 -translate-y-1/2"
                    />

                    <p className="font-bold text-lg absolute top-1/2 -translate-y-1/2 left-16 text-[#41BE90]">
                      {t('startNow')}
                    </p>
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <div className="p-3 -rotate-12 rounded-full absolute -top-4 right-2 bg-white shadow-[0px_3.641px_40.053px_0px_rgba(47,50,125,0.10)]">
              <IoIosCloseCircleOutline color="#EE3175" size={32} />
            </div>
            <div className="p-3 rounded-full rotate-12 bg-white absolute top-6 -right-6 shadow-[0px_3.641px_40.053px_0px_rgba(47,50,125,0.10)]">
              <FaRegCheckCircle color="#2DD38E" size={28} />
            </div>

            <div className="bg-[#F3538C] w-3 h-3 rounded-full absolute bottom-1/3 -right-20"></div>

            {index !== 0 && (
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-20"
                onClick={() => setIndex((prev) => prev - 1)}
              >
                <FaAngleLeft
                  color="#979797"
                  size={48}
                  className="hover:fill-purple"
                />
              </button>
            )}
            {index < carousels.length - 1 && (
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-16"
                onClick={() => setIndex((prev) => prev + 1)}
              >
                <FaAngleRight
                  color="#979797"
                  size={48}
                  className="hover:fill-purple"
                />
              </button>
            )}
          </Card>
        </div>

        <div>
          <p className="text-[#2F327D] font-semibold text-[40px]">
            {t('usefulFeatures')}
          </p>

          <p className="leading-[180%] text-[22px] max-w-[489px] text-[#696984] mt-12">
            {t('learnFast')}
          </p>
          <ul className="list-disc list-inside ml-6 text-[#696984] text-[22px]">
            <li>{t('learnCritical')}</li>
            <li>{t('learnSigns')}</li>
            <li>{t('challengeBank')}</li>
          </ul>
        </div>
      </div>

      {/* <div className="w-full bg-[#F1EEFB] h-[210px] flex px-20 py-[26px] justify-between ">
        <div className="w-[374px] text-center">
          <GoClock size={48} className="mx-auto" />
          <p className="text-2xl font-bold my-4">500+</p>
          <p className="text-xl">Giờ học trực tuyến</p>
        </div>
        <div className="w-[374px] text-center">
          <PiTreeStructureLight size={48} className="mx-auto" />
          <p className="text-2xl font-bold my-4">5000+</p>
          <p className="text-xl">Lượt truy cập mỗi ngày.</p>
        </div>
        <div className="w-[374px] text-center">
          <TbStars size={48} className="mx-auto" />
          <p className="text-2xl font-bold my-4">15000+</p>
          <p className="text-xl">Học viên đã tham gia ôn luyện</p>
        </div>
      </div> */}

      <div className="flex max-w-[1200px] mx-auto mt-[90px] mb-[280px] gap-[90px]">
        <div>
          <p className="text-[#5E6282] text-lg uppercase">{t('review')}</p>
          <p
            className={`text-[50px] font-bold ${vollkorn.className} max-w-[443px]`}
          >
            {t('commentFromUser')}
          </p>
        </div>

        <div className="relative">
          <Card className="w-[504px] h-[245px] absolute z-10">
            <Image
              src={Guest}
              alt="avatar"
              width={68}
              height={68}
              className="rounded-full absolute -top-[34px] -left-[34px]"
            />
            <CardContent
              className={`text-[#5E6282] pt-7 pl-[34px] pb-[34px] ${poppins.className}`}
            >
              <p className=" max-w-[402px] leading-8">
                "On the Windows talking painted pasture yet its express parties
                use. Sure last upon he same as knew next. Of believed or
                diverted no."
              </p>
              <p className="mt-[34px] text-lg font-semibold">Mike taylor</p>
              <p className="text-sm font-medium">Lahore, Pakistan</p>
            </CardContent>
          </Card>
          <Card className="!z-0 absolute w-[504px] h-[245px] -bottom-[142px] left-[50px]">
            <CardContent
              className={`text-[#5E6282] pt-7 pl-[34px] pb-[16px] bg-[#f7f7f7] ${poppins.className}`}
            >
              <p className=" max-w-[402px] leading-8">
                "Onno n the Windows talking painted pasture yet its express parf
                believed or diverted . Onno n the Windows talking painted
                pasture yet its expres nno n t"
              </p>
              <p className="mt-[34px] text-lg font-semibold">Chris Thomas</p>
              <p className="text-sm font-medium">CEO of Red Button</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full h-[660px] bg-[#A08CE6] relative">
        <Image src={Phone} alt="phone" className="absolute z-10" />
        <Image src={Path} alt="phone" className="absolute bottom-0" />

        <div className="absolute top-1/2 -translate-y-1/2 right-0 text-white">
          <p className={`font-bold text-[40px] ${montserratAlter.className}`}>
            {t('download')}
          </p>

          <p className="my-6 max-w-[504px] font-lg">
            "{t('downloadDescription')}"
          </p>

          <a
            target="_blank"
            href="https://drive.google.com/file/d/1Dx1Sw2QuZUq2ccYqTd67w0waAcztO9bf/view?usp=drive_link"
          >
            <Image
              src={GooglePlay}
              alt="google play"
              className="w-[135px] h-[40px]"
            />
          </a>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default Home
