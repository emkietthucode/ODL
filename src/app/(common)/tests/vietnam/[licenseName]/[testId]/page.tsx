import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestComponent from '@/components/test-component'

const TestPage = () => {
  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full ">
        <div className="flex flex-col gap-[16px] justify-between items-center h-full w-[71%] ml-16">
          <div className="flex flex-col gap-[32px] z-20 mt-10 ">
            <div className="text-purple text-4xl font-bold">
              LÀM BÀI THI THỬ
            </div>
            <div className="w-[75%] text-sm">
              Thi thử mô phỏng bài thi sát hạch chính thức, giúp người dùng kiểm
              tra kiến thức về luật giao thông, biển báo và xử lý tình huống. Đề
              thi được xây dựng theo đúng cấu trúc và nội dung quy định, bao gồm
              cả câu hỏi điểm liệt, mang lại trải nghiệm sát với kỳ thi thật,
              giúp người học đánh giá mức độ sẵn sàng của mình.
            </div>
          </div>
        </div>
        <TestComponent />
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default TestPage
