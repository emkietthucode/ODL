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
  const [testStructure, setTestStructure] = useState<CauTrucDeThi[]>([
    {
      id: '',
      so_cau_de_dat: 0,
      so_cau_diem_liet: 0,
      thoi_gian_lam_bai: 0,
      ma_hang_bang: '',
      created_at: '2025-01-16T08:15:49.577045+00:00',
      updated_at: '2025-01-16T08:15:49.577045+00:00',
    },
  ])
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()

  // Get Test Format
  useEffect(() => {
    const fetchTestFormat = async () => {
      const { data, error } = await supabase.rpc('get_cau_truc_by_de_thi', {
        de_thi_id: params.testId,
      })

      if (error) {
        console.error('Error:', error)
        return toast.error('Lỗi khi lấy cấu trúc đề thi')
      }
      setTestStructure(data)
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
