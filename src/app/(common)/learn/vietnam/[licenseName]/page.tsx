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
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HangBang } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import LearningCard from '@/components/learning-card'

const TestsLicensePage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()

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
        <div className="flex flex-col gap-[32px] justify-between items-center h-full w-[60%]">
          <div className="flex justify-start relative w-full">
            <div className="flex flex-col gap-10 z-20 mt-20">
              <div className="text-purple text-5xl font-semibold">
                {`LOẠI BẰNG LÁI: ${license?.ten_hang_bang}`}
              </div>
              <div className="w-[60%]">{license?.mo_ta_hang_bang}</div>
            </div>
          </div>
        </div>
        <div className="w-full h-[440px] bg-custom-violet mt-[96px] flex justify-center items-center relative">
          <div className="flex w-[60%] items-center justify-between h-full">
            <div className="flex flex-col gap-[50px] justify-center w-[70%] h-full">
              <div className="font-bold text-3xl text-white">
                CHƯA BIẾT BẮT ĐẦU TỪ ĐÂU?
              </div>
              <div className="font-medium text-sm text-white w-[90%]">
                Chức năng Học theo lộ trình hướng dẫn người dùng ôn luyện từ cơ
                bản đến nâng cao qua các bài thi được sắp xếp theo thứ tự hợp
                lý. Hệ thống chia nhỏ nội dung thành các phần, giúp bạn từng
                bước làm quen với bộ câu hỏi và nâng cao kỹ năng trước khi tham
                gia kỳ thi thực tế.
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
              >
                BẮT ĐẦU
              </Button>
            </div>
            <Image src={F11Studying} alt="" />
          </div>
          <Image
            src={F11Overlay}
            alt=""
            className="absolute -top-[350px] right-[0px] opacity-40"
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center mb-[128px]">
          <div className="flex flex-col gap-5 justify-center items-center my-[128px] ">
            <div className="text-4xl font-bold text-blue-400">HỌC TỰ DO</div>
            <div className="text-xl font-medium text-center">
              cho phép bạn chọn bất kỳ câu hỏi, biển báo, hoặc nội dung nào để
              ôn luyện theo ý thích, giúp học tập linh hoạt và tập trung vào
              những phần bạn cần cải thiện.
            </div>
          </div>
          <div className="flex flex-wrap gap-x-[150px] gap-y-[64px] justify-center items-center">
            <LearningCard
              icon={F11LearningCardIcon1}
              title="HỌC CÂU HỎI LÝ THUYẾT:"
              desc="Giúp bạn ôn tập toàn bộ kiến thức luật giao thông qua các câu hỏi trắc nghiệm chính thức."
            />
            <LearningCard
              icon={F11LearningCardIcon2}
              title="HỌC CÂU HỎI LÝ THUYẾT:"
              desc="Giúp bạn ôn tập toàn bộ kiến thức luật giao thông qua các câu hỏi trắc nghiệm chính thức."
            />
            <LearningCard
              icon={F11LearningCardIcon3}
              title="HỌC CÂU HỎI LÝ THUYẾT:"
              desc="Giúp bạn ôn tập toàn bộ kiến thức luật giao thông qua các câu hỏi trắc nghiệm chính thức."
            />
            <LearningCard
              icon={F11LearningCardIcon4}
              title="HỌC CÂU HỎI LÝ THUYẾT:"
              desc="Giúp bạn ôn tập toàn bộ kiến thức luật giao thông qua các câu hỏi trắc nghiệm chính thức."
            />
          </div>
        </div>
        <div className="w-full h-full bg-blue-100/40 flex justify-center py-20">
          <div className="w-[60%] h-full flex justify-between items-center">
            <div className="flex flex-col gap-10 w-[70%]">
              <div className="text-purple text-3xl font-bold">
                Sẵn sàng để thi thử?
              </div>
              <div>
                Nếu bạn đã sẵn sàng, hãy bắt đầu Thi thử ngay để kiểm tra kiến
                thức và đánh giá mức độ chuẩn bị của mình!
              </div>
            </div>
            <Button
              variant="main"
              size="auto"
              className="font-medium w-[150px]"
            >
              THI THỬ A1
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestsLicensePage
