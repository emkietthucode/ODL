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
import { useState } from 'react'
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

const carousels = [
  {
    title: 'Học câu điểm liệt',
    description: 'Những câu hỏi về tình huống vi phạm giao thông nghiêm trọng.',
    image: Traffic,
  },
  {
    title: 'Học biển báo',
    description: 'Những câu hỏi về tình huống vi phạm giao thông nghiêm trọng.',
    image: Sign,
  },
  {
    title: 'Học những câu thường sai',
    image: WrongQuestions,
  },
]

const Home = () => {
  const t = useTranslations('HomePage')
  const [index, setIndex] = useState<number>(0)

  return (
    <main className="text-left w-full  bg-white">
      <div className=" bg-white max-w-[1200px] mx-auto left-0 p-10">
        <h1 className="text-xl font-bold text-[#8070B8] uppercase">
          online driving license
        </h1>
        <p
          className={`mt-10 text-[40px] font-extrabold max-w-[391px] ${vollkorn.className}`}
        >
          Chinh phục tay lái, vượt mọi giới hạn!
        </p>
        <p className="max-w-[470px] mt-[26px]">
          ODL mang đến giải pháp ôn thi bằng lái xe nhanh chóng và tiện lợi,
          giúp bạn học mọi lúc, mọi nơi. Hệ thống bài thi sát thực tế và hỗ trợ
          đa quốc gia, ODL đồng hành cùng bạn trên hành trình chinh phục kỳ thi
          lái xe dễ dàng nhất.
        </p>

        <div className="flex mt-[90px] gap-[100px] items-center">
          <Link href="/learning-path">
            <Button
              variant="main"
              size="auto"
              className="text-[28px] h-[54px] p-[10px] rounded-full shadow-lg min-w-40"
            >
              Luyện thi
            </Button>
          </Link>

          <Link href="/tests">
            <button className="flex items-center gap-[17px]">
              <IoMdArrowDroprightCircle size={67} fill="#DF6951" />

              <span className="text-[#686D77] text-[17px]">Thi thử</span>
            </button>
          </Link>
        </div>

        <div className="absolute top-24 right-0 h-[550px] w-[680px] object-right">
          <Image src={HomeImage} alt="Landing image" />
        </div>
      </div>

      <div className="pt-[38px] mt-6">
        <p className="w-full text-center uppercase font-semibold text-[#5E6282]">
          thi thử
        </p>
        <p
          className={`w-full text-center text-4xl font-bold mt-[6px] ${montserratAlter.className}`}
        >
          Các Hạng Bằng Thông Dụng
        </p>

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
                  Xe mô tô hai bánh có dung tích xi-lanh từ 50 đến 125 cm3.
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
                  Xe mô tô hai bánh có dung tích xi-lanh từ 125 cm3 trở lên và
                  các loại xe quy định cho giấy phép lái xe hạng A1.{' '}
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
                  Xe ô tô chở người đến 08 chỗ; xe ô tô có khối lượng theo thiết
                  kế đến 3.500 kg; kéo rơ moóc có khối lượng theo thiết kế đến
                  750 kg.
                </p>
              </CardContent>
              <div className="bg-[#D6B07A] text-center leading-[60px] w-[60px] h-[60px] rounded-full font-bold text-4xl text-white absolute left-1/2 -top-[30px] -translate-x-1/2">
                3
              </div>
            </Card>
          </Link>
        </div>

        <div className="mt-[144px] max-w-[1116px] mx-auto flex">
          <div className="">
            <div>
              <p className="uppercase text-[#5E6282] text-lg">
                LUYỆN THI NHANH:
              </p>
              <p
                className={`max-w-[625px] ${montserratAlter.className} text-[50px] font-bold`}
              >
                LUYỆN THI BẰNG LÁI XE THEO LỘ TRÌNH
              </p>
            </div>
            <div className="mt-10 flex gap-[21px]">
              <div className="w-12 h-12 bg-[#F0BB1F] rounded-[13px] flex items-center justify-center">
                <FaBookOpen size={24} fill="white" />
              </div>

              <div>
                <p className="font-bold text-[#5E6282]">
                  Học câu hỏi theo từng chương
                </p>
                <p className="max-w-[355px] text-sm">
                  Các câu hỏi được hệ thống phân loại, người dùng cần học lần
                  lượt từng câu hỏi
                </p>
              </div>
            </div>

            <div className="flex gap-[21px] mt-[54px]">
              <div className="w-12 h-12 bg-[#F15A2B] rounded-[13px] flex items-center justify-center">
                <IoPencilSharp size={24} fill="white" />
              </div>

              <div>
                <p className="font-bold text-[#5E6282]">
                  Làm bài kiểm tra cuối chương
                </p>
                <p className="max-w-[355px] text-sm">
                  Sau khi hoàn thành toàn bộ câu hỏi của chương, hệ thống sẽ mở
                  khóa bài kiểm tra.
                </p>
              </div>
            </div>

            <div className="flex gap-[21px] mt-[54px]">
              <div className="w-12 h-12 bg-[#006380] rounded-[13px] flex items-center justify-center">
                <IoCheckmarkDoneSharp size={24} color="white" />
              </div>

              <div>
                <p className="font-bold text-[#5E6282]">
                  Hoàn thành chương và tiếp tục học
                </p>
                <p className="max-w-[355px] text-sm">
                  Vượt qua bài kiểm tra để mở khóa các chương tiếp theo.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Card className="w-[370px] h-[400px] mt-[68px] px-6 pt-[20px] relative">
              <CardHeader className="p-0 relative">
                <div className="h-[161px] bg-[#F0F8FF] rounded-[24px]"></div>
                <Image
                  src={CardSample}
                  alt="image"
                  className="absolute w-[277px] h-[229px] left-[68px] -bottom-[14px]"
                />
              </CardHeader>

              <CardContent className="p-0 ">
                <p className="text-lg font-medium mt-[26px] mb-[13px]">
                  Học theo lộ trình
                </p>
                <p className="text-[#84829A]">Chương 1/3 | A1</p>

                <div className="flex gap-[18px] mt-[21px] mb-[29px]">
                  <div className="w-9 h-9 bg-[#F5F5F5] flex items-center justify-center rounded-full">
                    <FaBookOpen size={16} fill="#979797" />
                  </div>

                  <div className="w-9 h-9 bg-[#F5F5F5] flex items-center justify-center rounded-full">
                    <IoPencilSharp size={16} fill="#979797" />
                  </div>

                  <div className="w-9 h-9 bg-[#F5F5F5] flex items-center justify-center rounded-full">
                    <PiListBold size={16} fill="#979797" />
                  </div>
                </div>

                <p className="text-[#84829A]">24 người dùng đang học</p>
              </CardContent>

              <Card className="absolute -right-1/4 bottom-12 w-[263px] h-[139px] rounded-[18px] pt-[18px] pl-[20px]">
                <CardContent className="p-0">
                  <div className="flex gap-3">
                    <Avatar>
                      <Image
                        src={AvatarSample}
                        className="w-[50px] h-[50px] rounded-full"
                        alt="Avatar"
                      />
                    </Avatar>

                    <div>
                      <p className="text-sm text-[#84829A]">Lộ trình</p>
                      <p className="text-lg">Chương 1</p>

                      <p className="mt-[14px] mb-[10px]">
                        <span className="text-[#8A79DF] text-sm">40%</span>{' '}
                        completed
                      </p>

                      <div className="h-[5px] w-[156px] rounded-full bg-[#F5F5F5]">
                        <div className="w-[40%] h-full rounded-full bg-[#8A79DF]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
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
                  <div className="relative w-full h-full ml-8">
                    <div className="w-12 h-12 rounded-full bg-[#D8F9ED] top-1/2 -translate-y-1/2 absolute"></div>
                    <Image
                      src={Fly}
                      alt="fly"
                      width={80}
                      height={72}
                      className="absolute -left-4 top-1/2 -translate-y-1/2"
                    />

                    <p className="font-bold text-lg absolute top-1/2 -translate-y-1/2 left-16 text-[#41BE90]">
                      Bắt đầu ngay
                    </p>
                  </div>
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
            {index <= 2 && (
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
            Các chức năng hữu ích:
          </p>

          <p className="leading-[180%] text-[22px] max-w-[489px] text-[#696984] mt-12">
            Các chức năng giúp người dùng luyện thi nhanh:
          </p>
          <ul className="list-disc list-inside ml-6 text-[#696984] text-[22px]">
            <li>Học câu điểm liệt.</li>
            <li>Học câu điểm liệt.</li>
            <li>Học câu điểm liệt.</li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-[#F1EEFB] h-[210px] flex px-20 py-[26px] justify-between ">
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
      </div>

      <div className="flex max-w-[1200px] mx-auto mt-[90px] mb-[280px] gap-[90px]">
        <div>
          <p className="text-[#5E6282] text-lg uppercase">Đánh giá</p>
          <p
            className={`text-[50px] font-bold ${vollkorn.className} max-w-[443px]`}
          >
            NHẬN XÉT TỪ NGƯỜI DÙNG
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
                “On the Windows talking painted pasture yet its express parties
                use. Sure last upon he same as knew next. Of believed or
                diverted no.”
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
                “Onno n the Windows talking painted pasture yet its express parf
                believed or diverted . Onno n the Windows talking painted
                pasture yet its expres nno n t”
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
            Tải về ứng dụng ngay
          </p>

          <p className="my-6 max-w-[504px] font-lg">
            "Ứng dụng đã chính thức ra mắt hôm nay – tải ngay để bắt đầu hành
            trình học tập hiệu quả và thú vị hơn!"
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
