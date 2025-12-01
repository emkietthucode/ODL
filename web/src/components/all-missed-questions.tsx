import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import MissedQuestion from './missed-question-row'

const ITEMS_PER_PAGE = 20

const AllMissedQuestions = ({ questions }: { questions: any[] }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredQuestions = questions.filter((q) =>
    q.noi_dung_cau_hoi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setExpandedQuestion(null) // Close expanded question when changing pages
  }

  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden mb-8 flex flex-col justify-center w-[97%] self-center">
      <div className="bg-custom-normal-violet font-bold text-sm text-white py-2 px-4">
        <div className="flex justify-center items-center">
          <span>{`SỐ CÂU: ${filteredQuestions.length || 0}`}</span>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4 w-[95%] self-center">
        {currentQuestions.map((q) => (
          <div
            key={q.id}
            className="border rounded-xl overflow-hidden bg-gray-50"
          >
            <MissedQuestion
              q={q}
              bookmarkedQuestions={bookmarkedQuestions}
              toggleBookmark={toggleBookmark}
              toggleQuestion={toggleQuestion}
            />

            {expandedQuestion === q.id && (
              <div className="bg-gray-50 p-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  {q.lua_chon.map((answer: any, index: any) => (
                    <div
                      key={index}
                      className={`p-3 ${
                        answer.la_lua_chon_dung
                          ? 'bg-custom-light-green'
                          : 'bg-white'
                      } border rounded-md hover:bg-purple-50 cursor-pointer min-h-[60px] h-full`}
                    >
                      <p className="text-xs">{answer.noi_dung_lua_chon}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-8 space-x-5">
        <Button
          variant="outline"
          size="icon"
          className="h-[30px] w-[50px] p-0 bg-gray-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <MdKeyboardArrowLeft />
        </Button>
        <span className="text-sm font-semibold">{`${currentPage}/${totalPages}`}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-[30px] w-[50px] p-0 bg-gray-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default AllMissedQuestions
