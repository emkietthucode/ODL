'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import F12Overlay from '../../../../../../../public/images/f12Overlay.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Chuong, HangBang } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

const LearnTheoryPage = () => {
  const params = useParams<{ licenseName: string }>()
  const [license, setLicense] = useState<HangBang>()
  const [chapters, setChapters] = useState<Chuong[]>([])
  const [selectedChapter, setSelectedChapter] = useState<Chuong>()

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

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col items-center h-full relative">
        <div className="flex flex-col gap-[32px] justify-between items-center h-full w-[60%]">
          <div className="flex justify-start w-full">
            <div className="flex flex-col z-20 mt-20">
              <hr className="w-28 h-1 bg-purple border-0 rounded-sm  dark:bg-purple" />
              <div className="text-purple text-2xl font-bold my-5">
                HỌC CÂU HỎI LÝ THUYẾT
              </div>
              <div className="w-[60%]">
                100 câu hỏi lý thuyết đầu tiên trong bộ 200 câu{' '}
                {license?.ten_hang_bang} tập trung vào các kiến thức cơ bản về
                luật giao thông, quy định an toàn và các loại biển báo giao
                thông, giúp người học nắm vững các quy tắc cần thiết để thi sát
                hạch cấp giấy phép lái xe hạng {license?.ten_hang_bang}.
              </div>
            </div>
          </div>
        </div>
        <Image
          src={F12Overlay}
          alt=""
          className="absolute -z-0 right-[0px] top-[64px]"
        />
        <div className="w-full h-[184px] bg-light-purple mt-[64px] flex justify-center items-center z-20">
          <div className="flex w-full items-center justify-center h-full">
            <div className="flex flex-col gap-[50px] justify-center items-center w-[70%] h-full">
              <div className="flex flex-wrap gap-16">
                {chapters.map((chapter, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedChapter(chapter)}
                    className={cn(
                      `
                    text-lg 
                    text-purple 
                    font-medium 
                    rounded-full 
                    bg-white 
                    hover:bg-white/80 
                    border-purple 
                    border-2`,
                      selectedChapter?.id === chapter.id &&
                        'ring-4 ring-white/50 font-bold'
                    )}
                  >
                    {chapter.ten_chuong.toUpperCase()}
                  </Button>
                ))}
              </div>
              <div className="text-xl font-normal">
                {selectedChapter &&
                  selectedChapter.ten_chuong +
                    ': ' +
                    selectedChapter.mo_ta_chuong}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px]"></div>
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default LearnTheoryPage
