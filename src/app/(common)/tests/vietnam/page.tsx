import ScrollToTopButton from '@/components/scroll-to-top-button'
import LearnCategory from '../../../../../public/images/f5-learn-category.svg'
import B1Car from '../../../../../public/images/f5-b1-car.svg'
import B2Car from '../../../../../public/images/f5-b2-car.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const TestsCategoryPage = () => {
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full">
        <div className="flex flex-col h-full w-[60%]">
          <div className="flex justify-start relative">
            <div className="w-[72%] flex flex-col gap-10 z-20 mt-20">
              <div className="text-purple text-4xl font-semibold">
                THI THỬ LÝ THUYẾT
              </div>
              <div>
                Chức năng Thi thử lý thuyết mô phỏng bài thi sát hạch chính
                thức, giúp người dùng kiểm tra kiến thức về luật giao thông,
                biển báo, và kỹ năng xử lý tình huống. Đề thi được xây dựng đúng
                cấu trúc và nội dung theo quy định, bao gồm cả câu hỏi điểm liệt
                (nếu có), mang lại trải nghiệm sát với kỳ thi thực tế.
              </div>
            </div>
            <Image
              className="hidden xl:inline-block absolute z-10 right-0 top-[120px] "
              src={LearnCategory}
              alt=""
            />
          </div>
          <div className="w-full h-[200px]"></div>
        </div>
        <div className="w-full h-full bg-blue-100/40 flex justify-center p-10">
          <div className="w-[60%] h-full flex  justify-between items-center">
            <div className="flex flex-col h-[300px] w-[25%] text-center gap-5 items-center justify-between">
              <div className="font-bold text-5xl">A1</div>
              <div>
                dành cho người điều khiển xe mô tô hai bánh có dung tích xi-lanh
                từ 50cc đến dưới 175cc.
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[50%] self-end mx-auto"
              >
                THI THỬ
              </Button>
            </div>
            <div className="flex flex-col h-[300px] w-[25%] text-center gap-5 items-center justify-between">
              <div className="font-bold text-5xl">A2</div>
              <div>
                dành cho người điều khiển xe mô tô hai bánh có dung tích xi-lanh
                từ 175cc trở lên.
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[50%] self-end mx-auto"
              >
                THI THỬ
              </Button>
            </div>
            <div className="flex flex-col h-[300px] w-[25%] text-center gap-5 items-center justify-between">
              <div className="font-bold text-5xl">A3, A4</div>
              <div>
                Bằng A3 cấp cho người điều khiển xe mô tô ba bánh, Bằng A4 cấp
                cho người điều khiển máy kéo có trọng tải đến 1.000 kg.
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[50%] self-end mx-auto"
              >
                THI THỬ
              </Button>
            </div>
          </div>
        </div>
        <div className="h-full w-[60%] flex flex-col my-10 gap-[64px]">
          <div className="flex justify-between gap-20 w-full">
            <Image src={B1Car} alt="" />
            <div className="flex flex-col justify-center text-left gap-5">
              <hr className="w-[150px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-5xl">B1</div>
              <div>
                dành cho người điều khiển ô tô chở người dưới 9 chỗ và xe tải
                dưới 3.500 kg, không dùng để kinh doanh vận tải.
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px]"
              >
                THI THỬ
              </Button>
            </div>
          </div>
          <div className="flex justify-between gap-20 w-full">
            <div className="flex flex-col justify-center text-left gap-5">
              <hr className="w-[150px] h-1 my-1 bg-purple border-0 rounded dark:bg-purple"></hr>
              <div className="font-bold text-5xl">B2</div>
              <div>
                dành cho người điều khiển ô tô chở người dưới 9 chỗ, xe tải dưới
                3.500 kg và được hành nghề lái xe kinh doanh vận tải.
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px]"
              >
                THI THỬ
              </Button>
            </div>
            <Image src={B2Car} alt="" />
          </div>
          <hr className="w-[90%] h-[2px] my-1 mx-auto bg-light-purple border-0 rounded dark:bg-light-purp"></hr>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[128px] justify-between w-[40%]">
              <div className="flex flex-col">
                <div className="font-bold text-5xl mb-[25px]">C</div>
                <div>
                  dành cho người điều khiển ô tô tải, máy kéo có trọng tải từ
                  3.500 kg trở lên.
                </div>
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px]"
              >
                THI THỬ
              </Button>
            </div>
            <div className="flex flex-col gap-[128px] justify-between w-[45%]">
              <div className="flex flex-col">
                <div className="font-bold text-5xl mb-[20px]">
                  NÂNG HẠNG DEF
                </div>
                <div>
                  dành cho người điều khiển ô tô chở người 10 đến 30 chỗ; trên
                  30 chỗ; lái xe kéo rơ-mooc.
                </div>
              </div>
              <Button
                variant="main"
                size="auto"
                className="font-medium w-[100px]"
              >
                THI THỬ
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
