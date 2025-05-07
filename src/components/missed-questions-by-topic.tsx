import { useState } from 'react'
import { Search, ChevronDown, ChevronRight } from 'lucide-react'
import { Input } from './ui/input'
import MissedQuestion from './missed-question-row'

const MissedQuestionsByTopic = ({
  chuongWithCauHoi,
  totalQuestions = 0,
}: {
  chuongWithCauHoi: any[]
  totalQuestions: number
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])
  const [expandedChapters, setExpandedChapters] = useState<number[]>([])
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

  const toggleChapter = (chapterId: number) => {
    if (expandedChapters.includes(chapterId)) {
      setExpandedChapters(expandedChapters.filter((id) => id !== chapterId))
    } else {
      setExpandedChapters([...expandedChapters, chapterId])
    }
  }

  const filteredChapters = chuongWithCauHoi
    .map((chapter) => ({
      ...chapter,
      cau_hoi: chapter.cau_hoi.filter((q: any) =>
        q.noi_dung_cau_hoi.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((chapter) => chapter.cau_hoi.length > 0)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 flex flex-col justify-center w-[97%] self-center">
      <div className="bg-custom-normal-violet font-bold text-sm text-white py-2 px-4">
        <div className="flex justify-center items-center">
          <span>{`SỐ CÂU: ${totalQuestions}`}</span>
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
      <div className="space-y-4 w-[95%] self-center mb-8">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="border rounded-xl overflow-hidden bg-gray-50"
          >
            <div
              className="h-[67px] p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleChapter(chapter.id)}
            >
              <div className="flex items-center space-x-2">
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={20} className="text-gray-500" />
                ) : (
                  <ChevronRight size={20} className="text-gray-500" />
                )}
                <h3 className="font-medium">{`${chapter.ten_chuong}: ${chapter.mo_ta_chuong}`}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {chapter.cau_hoi.length || 0} câu hỏi
              </span>
            </div>

            {expandedChapters.includes(chapter.id) && (
              <div className="border-t bg-gray-100">
                {chapter.cau_hoi.map((q: any) => (
                  <div key={q.id} className="border-t">
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
                              <p className="text-xs">
                                {answer.noi_dung_lua_chon}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MissedQuestionsByTopic
