import ScrollToTopButton from '@/components/scroll-to-top-button'
import Student from '../../../../../../public/images/f6-student.svg'
import Overlay from '../../../../../../public/images/f6-overlay.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Montserrat_Alternates } from 'next/font/google'

const montserratAlternates = Montserrat_Alternates({
  weight: '700',
  subsets: ['vietnamese'],
})

const dethi = [1, 2, 3, 4, 5, 6]

const TestsLicensePage = () => {
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col gap-[32px] justify-between items-center h-full w-[60%]">
          <div className="flex justify-start relative w-[90%]">
            <div className="flex flex-col gap-10 z-20 mt-20">
              <div className="text-purple text-5xl font-semibold">
                LOẠI BẰNG LÁI: A1
              </div>
              <div className="w-[60%]">
                Bằng lái xe A1 ở Việt Nam là loại bằng dành cho người lái xe máy
                có dung tích động cơ từ 50cc đến dưới 175cc. Người sở hữu bằng
                A1 được phép điều khiển xe máy, xe gắn máy, và các loại phương
                tiện tương tự trong phạm vi quy định của pháp luật. Để thi bằng
                A1, thí sinh cần hoàn thành cả phần lý thuyết và thực hành, bao
                gồm các câu hỏi về luật giao thông và các kỹ năng lái xe cơ bản.
              </div>
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
                  <div className="text-2xl font-medium">SẴN SÀNG THI THỬ?</div>
                  <div>
                    Chức năng Thi với đề ngẫu nhiên giúp người dùng trải nghiệm
                    kỳ thi thực tế bằng cách tạo các đề thi ngẫu nhiên từ bộ câu
                    hỏi có sẵn. Mỗi lần thi, hệ thống sẽ tự động chọn các câu
                    hỏi khác nhau, đảm bảo không trùng lặp và giúp người học làm
                    quen với sự đa dạng của bài thi.
                  </div>
                </div>

                <Button
                  variant="main"
                  size="auto"
                  className="rounded-xl shadow-xl font-medium w-[150px] h-full"
                >
                  ĐỀ NGẪU NHIÊN
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[32px] items-center w-full">
            <div className="font-semibold">hoặc</div>
            <div className="text-purple text-2xl font-medium">
              THI THỬ VỚI BỘ ĐỀ CÓ SẴN
            </div>
            <div className="mb-[128px] mt-[16px] w-[60%] flex flex-wrap gap-10 justify-center">
              {dethi.map((_, index) => (
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
                >
                  ĐỀ SỐ {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-blue-100/40 flex justify-center py-20">
          <div className="w-[60%] h-full flex justify-between items-center">
            <div className="flex flex-col gap-10 w-[70%]">
              <div className="text-purple text-3xl font-semibold">
                Bạn chưa sẵn sàng để thi thử?
              </div>
              <div>
                Đừng lo, hãy bắt đầu với phần luyện thi bằng lái xe hạng A1. Tại
                đây, bạn có thể ôn lại kiến thức luật giao thông, biển báo, và
                thực hành các câu hỏi sát hạch để tự tin hơn.
              </div>
            </div>
            <Button
              variant="main"
              size="auto"
              className="font-medium w-[150px]"
            >
              LUYỆN THI A1
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestsLicensePage
