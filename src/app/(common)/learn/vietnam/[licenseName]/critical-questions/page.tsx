'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import F12Overlay from '../../../../../../../public/images/f12Overlay.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Chuong, HangBang, LuaChon } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { QuestionDTO } from '@/types/dto/types'
import LearnComponent from '@/components/learn-component'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const LearnCriticalPage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()
  const [chapters, setChapters] = useState<Chuong[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chuong>()
  const [questions, setQuestions] = useState<QuestionDTO[]>([])

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
  }, [params])

  useEffect(() => {
    const fetchChapters = async () => {
      const { data, error } = await supabase.from('chuong').select().limit(4)
      if (error || !data) {
        console.log(error)
        return toast.error('Lấy dữ liệu chương không thành công')
      }
      setChapters(data)
      setSelectedChapter(data[0])
    }
    fetchChapters()
  }, [])

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('cau_hoi')
        .select(
          `
          *,
          lua_chon (
            *
          )
        `
        )
        .limit(25)

      if (error) {
        console.error(error)
        return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
      }

      const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
        question: item,
        answers: item.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
          ? shuffleAnswers(item.lua_chon)
          : item.lua_chon.sort(
              (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
            ),
      }))

      setQuestions(formattedQuestions)
    }

    fetchQuestions()
  }, [])

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full relative">
        <div className="bg-custom-violet rounded-r-full mr-[128px] mt-10 flex justify-center items-center">
          <div className="flex flex-col gap-[32px] justify-between items-center h-full w-[60%]">
            <div className="flex justify-center w-full">
              <div className="bg-custom-light-violet rounded-full h-[250px]">
                <div className="flex flex-col justify-center ml-20 my-5">
                  <hr className="w-28 h-1 bg-purple border-0 rounded-sm  dark:bg-purple" />
                  <div className="text-purple text-2xl font-bold my-5">
                    HỌC CÂU ĐIỂM LIỆT
                  </div>
                  <div className="w-[80%]">
                    20 câu điểm liệt trong đề thi {license?.ten_hang_bang} là
                    những câu hỏi quan trọng, nếu trả lời sai sẽ khiến thí sinh
                    không qua kỳ thi. Những câu hỏi này tập trung vào các quy
                    định an toàn giao thông cơ bản và các tình huống khẩn cấp,
                    là những kiến thức cần thiết để đảm bảo an toàn khi tham gia
                    giao thông.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LearnComponent initialQuestions={questions} />
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default LearnCriticalPage
