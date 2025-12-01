import useAuth from '@/hooks/useAuth'
import useStoreMissedQuestions from '@/hooks/useStoreMissedQuestions'
import supabase from '@/utils/supabase/supabase'
import { Bookmark, Clock } from 'lucide-react'
import { useState } from 'react'

const MissedQuestion = ({
  q,
  toggleQuestion,
  toggleBookmark,
}: {
  q: any
  toggleQuestion: (id: number) => void
  toggleBookmark: (id: number) => void
  bookmarkedQuestions: number[]
}) => {
  const { user } = useAuth()
  const { questions, setQuestions } = useStoreMissedQuestions()
  const [isBookmarked, setIsBookmarked] = useState(q.duoc_danh_dau)
  const handleBookmarkClick = async (cauHoi: any) => {
    setIsBookmarked(!isBookmarked)
    // Update in database
    const { error } = await supabase
      .from('cau_hoi_thuong_sai')
      .update({ duoc_danh_dau: !cauHoi.duoc_danh_dau })
      .eq('cau_hoi_id', cauHoi.id)
      .eq('nguoi_dung_id', user?.id)

    if (error) {
      console.log('Failed to update bookmark:', error)
      // If error, maybe rollback optimistic UI update here
      setIsBookmarked(!isBookmarked)
      // Optionally, you can show a notification to the user
      return
    }
    const updatedQuestions = questions.map((item) => {
      if (item.id === cauHoi.id) {
        return { ...item, duoc_danh_dau: !item.duoc_danh_dau }
      }
      return item
    })
    setQuestions(updatedQuestions)
  }
  return (
    <div
      className="min-h-[67px] h-full p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-start"
      onClick={() => toggleQuestion(q.id)}
    >
      <div className="flex-1 my-auto">
        <p className="text-sm">{q.noi_dung_cau_hoi}</p>
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
            className="text-gray-400 cursor-pointer"
            fill={isBookmarked ? 'purple' : 'none'}
            stroke={isBookmarked ? 'purple' : 'currentColor'}
            onClick={() => handleBookmarkClick(q)}
          />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Clock size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default MissedQuestion
