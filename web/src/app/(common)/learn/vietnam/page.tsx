'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Pana from '../../../../../public/images/pana.svg'
import Card2 from '../../../../../public/images/f11LearningCardIcon2.svg'
import Card3 from '../../../../../public/images/f11LearningCardIcon3.svg'
import Card4 from '../../../../../public/images/f11LearningCardIcon4.svg'

const TestsCategoryPage = () => {
  const t = useTranslations('VietnamTestPage')
  const router = useRouter()

  return (
    <div className="mt-8">
      <div className="w-full h-[332px] bg-[#A08CE6] text-white py-[46px] px-[140px] flex justify-between">
        <div>
          <p className="font-bold text-[28px]">CHƯA BIẾT BẮT ĐẦU TỪ ĐÂU?</p>
          <p className="max-w-[480px] font-medium text-sm mt-[41px] mb-8">
            Chức năng Học theo lộ trình hướng dẫn người dùng ôn luyện từ cơ bản
            đến nâng cao qua các bài thi được sắp xếp theo thứ tự hợp lý. Hệ
            thống chia nhỏ nội dung thành các phần, giúp bạn từng bước làm quen
            với bộ câu hỏi và nâng cao kỹ năng trước khi tham gia kỳ thi thực
            tế.
          </p>
          <button
            onClick={() => router.push('/learning-path/vietnam')}
            className="w-[135px] h-[49px] bg-white text-purple font-bold text-2xl mx-auto block"
          >
            BẮT ĐẦU
          </button>
        </div>
        <Image src={Pana} alt="Pana" className="w-[371px] h-[234px]" />
      </div>

      <p className="font-bold text-[28px] text-[#5CAAE6] mx-auto mt-[80px] mb-8 w-full text-center">
        HỌC TỰ DO
      </p>
      <p className="max-w-[632px] text-center mx-auto mb-[100px] ">
        cho phép bạn chọn bất kỳ câu hỏi, biển báo, hoặc nội dung nào để ôn
        luyện theo ý thích, giúp học tập linh hoạt và tập trung vào những phần
        bạn cần cải thiện.
      </p>

      <div className="mx-auto flex gap-[45px] mb-[145px] justify-center">
        <Link
          href="/learn/vietnam/signs"
          className="w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col "
        >
          <Image src={Card2} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">HỌC BIỂN BÁO GIAO THÔNG:</p>
            <p className="mt-4">
              Cung cấp danh sách biển báo kèm giải thích chi tiết, giúp bạn ghi
              nhớ nhanh và chính xác.
            </p>
          </div>
        </Link>

        <Link
          href="/learn/vietnam/car/critical-questions"
          className="w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col"
        >
          <Image src={Card3} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">HỌC CÂU ĐIỂM LIỆT:</p>
            <p className="mt-4">
              Tập trung ôn luyện các câu hỏi quan trọng, bắt buộc phải trả lời
              đúng để vượt qua kỳ thi.
            </p>
          </div>
        </Link>

        <Link
          href="/missed-questions"
          className="w-[250px] h-[350px] shadow-[5px_5px_7px_5px_rgba(0,0,0,0.25)] px-4 py-7 flex flex-col"
        >
          <Image src={Card4} alt="logo" width={45} height={45} />

          <div className="text-[#7869AD] text-sm mt-[120px]">
            <p className="font-semibold">LÀM LẠI NHỮNG CÂU SAI:</p>

            <p className="mt-4">
              Lưu lại và giúp bạn luyện tập các câu hỏi đã trả lời sai để cải
              thiện điểm số và nắm chắc kiến thức.
            </p>
          </div>
        </Link>
      </div>

      <div className="w-full bg-[#E8F5FF] px-40 pt-[90px] pb-[116px] flex items-center justify-between">
        <div>
          <p className="text-[#8070B8] font-bold text-[28px]">
            Sẵn sàng để thi thử?
          </p>

          <p className="text-sm max-w-[674px] mt-7">
            Nếu bạn đã sẵn sàng, hãy bắt đầu Thi thử ngay để kiểm tra kiến thức
            và đánh giá mức độ chuẩn bị của mình!
          </p>
        </div>

        <button
          onClick={() => router.push('/tests/vietnam')}
          className="w-[189px] h-[53px] rounded-[16px] text-white bg-purple text-xl font-medium"
        >
          THI THỬ
        </button>
      </div>
    </div>
  )
}

export default TestsCategoryPage
