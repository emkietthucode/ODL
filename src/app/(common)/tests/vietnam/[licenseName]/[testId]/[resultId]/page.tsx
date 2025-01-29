'use client'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import TestPass from '@/components/test-pass'
import TestFail from '@/components/test-fail'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import supabase from '@/utils/supabase/supabase'
import toast from 'react-hot-toast'
import { CauTrucDeThi } from '@/types/types'

const ResultPage = () => {
  const { item: questions } = useConfirmSubmitTestModal()
  const [testFormat, setTestFormat] = useState<CauTrucDeThi | null>(null)
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()

  // Get Test Format
  useEffect(() => {
    const fetchTestFormat = async () => {
      const { data, error } = await supabase
        .from('de_thi')
        .select(
          `
      ma_cau_truc,
      cau_truc_de_thi (
        id,
        so_cau_de_dat,
        so_cau_diem_liet,
        thoi_gian_lam_bai,
        ma_hang_bang,
        created_at,
        updated_at
      )
    `
        )
        .eq('id', params.testId)
        .single()

      if (error) {
        console.error('Error:', error)
        return toast.error('Lỗi khi lấy cấu trúc đề thi')
      }
      if (data && data.cau_truc_de_thi.length > 0) {
        setTestFormat(data.cau_truc_de_thi[0])
      } else {
        return toast.error('Không có cấu trúc đề thi này')
      }
    }
    fetchTestFormat()
  }, [])

  return (
    <main className="bg-white mx-auto my-auto max-h-full">
      <div className="flex flex-col justify-around items-center h-full ">
        <TestFail />
      </div>
      <ScrollToTopButton />
    </main>
  )
}

export default ResultPage
