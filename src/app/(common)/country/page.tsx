import ScrollToTopButton from '@/components/scroll-to-top-button'
import SelectCountryVietNam from '../../../../public/images/select-country-vietnam.svg'
import SelectCountryAus from '../../../../public/images/select-country-aus.svg'
import { ChevronsRight } from 'lucide-react'
import { Montserrat_Alternates } from 'next/font/google'
import Image from 'next/image'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['vietnamese'],
})

const CountrySelection = () => {
  return (
    <main className="max-w-[80%] bg-white mx-auto h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="bg-worldMapImg bg-repeat bg-cover bg-bottom w-full h-screen flex flex-col items-center">
          <div className="flex flex-col justify-center items-center my-[128px]">
            <div className="text-6xl font-extrabold text-purple">
              CHỌN QUỐC GIA
            </div>
            <hr className="w-[450px] h-1 mx-auto my-7 bg-purple border-0 rounded dark:bg-purple"></hr>
            <div className="my-10 w-[650px] break text-center text-purple text-2xl font-medium">
              ODL là website ôn thi bằng lái xe đa quốc gia, giúp bạn học và thi
              thử theo quy định của nhiều nước trên thế giới.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[128px] mb-[64px]">
          <div className="flex justify-between">
            <div className="flex flex-col w-[50%]">
              <hr className="w-[100px] h-1 my-2 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className={`text-3xl ${montserratAlternates.className}`}>
                VIỆT NAM
              </div>
              <div className="mt-10 mb-5 text-xl">
                Thi lý thuyết lái xe ở Việt Nam kiểm tra kiến thức về luật giao
                thông, biển báo và xử lý tình huống qua các câu hỏi trắc nghiệm.
                Thí sinh cần đạt điểm yêu cầu, bao gồm các câu hỏi điểm liệt, để
                vượt qua phần thi này.
              </div>
              <div className="flex gap-3 items-center cursor-pointer">
                <div
                  className={`underline text-purple text-3xl ${montserratAlternates.className}`}
                >
                  Bắt đầu ngay
                </div>
                <ChevronsRight className="text-purple" />
              </div>
            </div>
            <Image className="" src={SelectCountryVietNam} alt="" />
          </div>
          <div className="flex justify-between">
            <Image className="" src={SelectCountryAus} alt="" />
            <div className="flex flex-col w-[50%]">
              <hr className="w-[100px] h-1 my-2 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className={`text-3xl ${montserratAlternates.className}`}>
                ÚC
              </div>
              <div className="mt-10 mb-5 text-xl">
                Thi lý thuyết lái xe ở Úc kiểm tra kiến thức về luật giao thông,
                biển báo và xử lý tình huống qua các câu hỏi trắc nghiệm.
                Website hỗ trợ ôn thi cho nhiều tiểu bang, giúp thí sinh luyện
                tập theo các quy định và yêu cầu riêng của từng vùng.
              </div>
              <div className="flex gap-3 items-center cursor-pointer">
                <div
                  className={`underline text-purple text-3xl ${montserratAlternates.className}`}
                >
                  Bắt đầu ngay
                </div>
                <ChevronsRight className="text-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </main>
  )
}

export default CountrySelection
