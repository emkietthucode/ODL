'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Overlay1 from '../../../../public/images/F8Overlay1.svg'
import Overlay2 from '../../../../public/images/F8Overlay2.svg'
import Image from 'next/image'
import MissedQuestionsByTopic from '@/components/missed-questions-by-topic'
import AllMissedQuestions from '@/components/all-missed-questions'
import useAuth from '@/hooks/useAuth'
import supabase from '@/utils/supabase/supabase'
import useStoreMissedQuestions from '@/hooks/useStoreMissedQuestions'
import Loading from '@/components/loading'
import { usePathname, useRouter } from 'next/navigation'

const MissedQuestionsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [chuongWithCauHoi, setChuongWithCauHoi] = useState<any[]>([])
  const { questions, setQuestions } = useStoreMissedQuestions()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchMissedQuestions = async () => {
      setLoading(true)

      const { data: cauHoiThuongSaiList, error: error1 } = await supabase
        .from('cau_hoi_thuong_sai')
        .select('cau_hoi_id, duoc_danh_dau')
        .eq('nguoi_dung_id', user?.id)

      if (error1) {
        console.log(error1)
        setLoading(false)
        return
      }

      const cauHoiIds =
        cauHoiThuongSaiList?.map((item) => item.cau_hoi_id) || []

      const { data: cauHoiList, error: error2 } = await supabase
        .from('cau_hoi')
        .select(
          'id, noi_dung_cau_hoi, ma_chuong, lua_chon(id, noi_dung_lua_chon, la_lua_chon_dung, so_thu_tu)'
        )
        .in('id', cauHoiIds)

      if (error2) {
        console.log(error2)
        setLoading(false)
        return
      }
      const mergedCauHoiList =
        cauHoiList?.map((cauHoi) => {
          const found = cauHoiThuongSaiList?.find(
            (item) => item.cau_hoi_id === cauHoi.id
          )
          return {
            ...cauHoi,
            duoc_danh_dau: found?.duoc_danh_dau || false, // or whatever default you want
          }
        }) || []
      setQuestions(mergedCauHoiList || [])

      const chuongIds = cauHoiList?.map((item) => item.ma_chuong) || []

      const { data: chuongList, error: error3 } = await supabase
        .from('chuong')
        .select('id, ten_chuong, mo_ta_chuong')
        .in('id', chuongIds)

      if (error3) {
        console.log(error3)
        setLoading(false)
        return
      }

      setChuongWithCauHoi(chuongList || [])
      setLoading(false)
    }

    fetchMissedQuestions()
  }, [user?.id])

  if (loading) {
    return <Loading />
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
              className={`
              bg-custom-light-hover-blue 
              text-custom-dark-violet 
              hover:bg-custom-light-hover-blue 
              ring-custom-normal-light-blue
              ring-2
              rounded-3xl 
              w-[182px] h-[52px] 
              font-bold
              text-xl
              select-none
              px-8 ml-auto ${questions.length === 0 && 'cursor-not-allowed'}`}
              disabled={questions.length === 0}
              onClick={() => router.push(`${pathname}/test`)}
            >
              KIỂM TRA
            </Button>
          </div>
          <hr className="h-[2px] mt-5 mb-3 w-[95%] self-center bg-gray-300 border-0 dark:bg-gray-700"></hr>
          {activeTab === 'all' ? (
            <AllMissedQuestions questions={questions} />
          ) : activeTab === 'topic' ? (
            <MissedQuestionsByTopic
              chuongWithCauHoi={chuongWithCauHoi?.map((chuong) => ({
                ...chuong,
                cau_hoi:
                  questions?.filter(
                    (cauHoi) => cauHoi.ma_chuong === chuong.id
                  ) || [],
              }))}
              totalQuestions={questions.length || 0}
            />
          ) : activeTab === 'bookmark' ? (
            <AllMissedQuestions
              questions={questions.filter((q) => q.duoc_danh_dau)}
            />
          ) : null}
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default MissedQuestionsPage
