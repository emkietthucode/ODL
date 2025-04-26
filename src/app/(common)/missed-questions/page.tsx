'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import { useState } from 'react'
import { Search, Bookmark, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Overlay1 from '../../../../public/images/F8Overlay1.svg'
import Overlay2 from '../../../../public/images/F8Overlay2.svg'
import Image from 'next/image'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const MissedQuestionsPage = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('all')

  const questions = [
    {
      id: 5,
      question:
        'Người lái xe được hiểu như thế nào trong các khái niệm dưới đây?',
      answers: [
        'Là người điều khiển phương tiện giao thông đường bộ.',
        'Là người điều khiển xe cơ giới trên đường bộ.',
        'Là người điều khiển xe thô sơ trên đường bộ.',
        'Tất cả các ý nêu trên.',
      ],
    },
    {
      id: 27,
      question:
        'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi buông cả hai tay; sử dụng xe để kéo, đẩy xe',
      answers: [
        'Là hành vi bị nghiêm cấm.',
        'Là hành vi không bị nghiêm cấm.',
        'Là hành vi bị nghiêm cấm tùy từng trường hợp.',
        'Là hành vi chỉ bị nghiêm cấm khi tham gia giao thông trên đường cao tốc.',
      ],
    },
    {
      id: 88,
      question:
        'Trên đường đang xảy ra ùn tắc những hành vi nào sau đây là thiếu văn hóa khi tham gia giao thông?',
      answers: [
        'Bấm còi liên tục thúc giục các phương tiện phía trước.',
        'Đi lên vỉa hè, đi ngược chiều để thoát khỏi nơi ùn tắc.',
        'Lấn làn, lấn chiếm phần đường của phương tiện khác.',
        'Tất cả các ý nêu trên.',
      ],
    },
    {
      id: 93,
      question:
        'Để đạt được hiệu quả phanh cao nhất, người lái xe mô tô phải sử dụng các kỹ năng như thế nào dưới đây?',
      answers: [
        'Sử dụng phanh trước.',
        'Sử dụng phanh sau.',
        'Sử dụng đồng thời cả phanh trước và phanh sau.',
        'Sử dụng phanh trước hoặc phanh sau tùy trường hợp.',
      ],
    },
    {
      id: 97,
      question:
        'Tay ga trên xe mô tô hai bánh có tác dụng gì trong các trường hợp dưới đây?',
      answers: [
        'Để điều khiển xe chạy về phía trước.',
        'Để điều tiết tốc độ của xe.',
        'Để điều khiển xe chạy lùi.',
        'Cả ý 1 và ý 2.',
      ],
    },
    {
      id: 116,
      question: 'Gặp biển nào xe xích lô được phép đi vào?',
      answers: [
        'Biển báo cấm xe thô sơ.',
        'Biển báo cấm xe xích lô.',
        'Biển báo cấm xe đạp.',
        'Không biển nào.',
      ],
    },
    {
      id: 162,
      question:
        'Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường)?',
      answers: [
        'Vạch liền nét màu trắng.',
        'Vạch đứt nét màu trắng.',
        'Vạch liền nét màu vàng.',
        'Vạch đứt nét màu vàng.',
      ],
    },
    {
      id: 180,
      question: 'Xe nào được quyền đi trước trong trường hợp này?',
      answers: ['Xe tải.', 'Xe con.', 'Xe lam.', 'Xe của bạn.'],
    },
  ]

  const toggleBookmark = (id: number) => {
    if (bookmarkedQuestions.includes(id)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter((qId) => qId !== id))
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, id])
    }
  }

  const toggleQuestion = (id: number) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null)
    } else {
      setExpandedQuestion(id)
    }
  }
  return (
    <main className="bg-white mx-auto my-auto max-h-full flex justify-center relative">
      <Image
        src={Overlay1}
        alt="Overlay"
        className="absolute top-[140px] left-0 z-10"
      />
      <Image
        src={Overlay2}
        alt="Overlay"
        className="absolute top-0 right-0 z-0"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white w-[80%] relative z-20">
        <div className="container mx-auto px-4 py-8 flex flex-col">
          <h1 className="text-2xl font-bold text-custom-dark-violet">
            ÔN LUYỆN NHỮNG CÂU HỎI THƯỜNG SAI
          </h1>
          <p className="text-custom-dark-violet mb-8 text-sm w-[70%]">
            Đây là nơi lưu trữ các câu hỏi người dùng thường trả lời sai hoặc
            gặp khó khăn trong quá trình học, giúp người dùng dễ dàng ôn lại
            những kiến thức chưa vững, từ đó cải thiện điểm số và cũng có kỹ
            năng.
          </p>

          <div className="flex flex-wrap gap-5">
            <Button
              className={`bg-light-purple-admin hover:bg-light-purple-admin w-[260px] h-[52px] ${
                activeTab === 'all' &&
                'border-purple-200 ring-4 ring-custom-dark-violet'
              } rounded-md px-8 font-bold text-xl text-custom-dark-violet`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </Button>
            <Button
              className={`bg-light-purple-admin hover:bg-light-purple-admin w-[260px] h-[52px] ${
                activeTab === 'topic' &&
                'border-purple-200 ring-4 ring-custom-dark-violet'
              } rounded-md px-8 font-bold text-xl text-custom-dark-violet`}
              onClick={() => setActiveTab('topic')}
            >
              Theo chủ đề
            </Button>
            <Button
              className={`bg-light-purple-admin hover:bg-light-purple-admin w-[260px] h-[52px] ${
                activeTab === 'bookmark' &&
                'border-purple-200 ring-4 ring-custom-dark-violet'
              } rounded-md px-8 font-bold text-xl text-custom-dark-violet`}
              onClick={() => setActiveTab('bookmark')}
            >
              Đánh dấu
            </Button>
            <Button
              className="
              bg-custom-light-hover-blue 
              text-custom-dark-violet 
              hover:bg-custom-light-hover-blue 
              ring-custom-normal-light-blue
              ring-2
              rounded-3xl 
              w-[182px] h-[52px] 
              font-bold
              text-xl
              px-8 ml-auto"
            >
              KIỂM TRA
            </Button>
          </div>
          <hr className="h-[2px] mt-5 mb-3 w-[95%] self-center bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 flex flex-col justify-center w-[97%] self-center">
            <div className="bg-custom-normal-violet font-bold text-sm text-white py-2 px-4">
              <div className="flex justify-center items-center">
                <span>SỐ CÂU: 25</span>
              </div>
            </div>

            <div className="p-4 w-[95%] self-center">
              <div className="relative mb-6">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="pl-10 border-gray-300 rounded-full w-[524px]"
                />
              </div>

              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="border rounded-xl overflow-hidden bg-gray-50"
                  >
                    <div
                      className="h-[67px] p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-start"
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="flex-1 my-auto">
                        <p className="text-sm">
                          <span>{q.id}. </span>
                          {q.question}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(q.id)
                          }}
                          className="p-2 rounded-md hover:bg-gray-100"
                        >
                          <Bookmark
                            size={20}
                            className={
                              bookmarkedQuestions.includes(q.id)
                                ? 'fill-purple-500 text-purple-500'
                                : 'text-gray-400'
                            }
                          />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-100">
                          <Clock size={20} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {expandedQuestion === q.id && (
                      <div className="bg-gray-50 p-4 border-t">
                        <div className="grid grid-cols-2 gap-2">
                          {q.answers.map((answer, index) => (
                            <div
                              key={index}
                              className="p-3 bg-white border rounded-md hover:bg-purple-50 cursor-pointer min-h-[60px] h-full"
                            >
                              <p className="text-xs">{answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center mt-8 space-x-5">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-[30px] w-[50px] p-0 bg-gray-50"
                  disabled={currentPage === 1}
                >
                  <MdKeyboardArrowLeft />
                </Button>
                <span className="text-sm font-semibold">1/1</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-[30px] w-[50px] p-0 bg-gray-50"
                  disabled={true}
                >
                  <MdKeyboardArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default MissedQuestionsPage
