'use client'
import ResultDetailPage from '@/components/result-detail'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const TestDetailPage = () => {
  const { item: questions } = useConfirmSubmitTestModal()
  const [testDesc, setTestDesc] = useState<string>('')
  const [userCompleteTime, setUserCompleteTime] = useState<string>('')
  const [userScore, setUserScore] = useState<number>(0)
  const [testTotalScore, setTestTotalScore] = useState<number>(0)
  const params = useParams<{
    licenseName: string
    testId: string
    resultId: string
  }>()

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  useEffect(() => {
    const fetchTestDesc = async () => {
      const { data, error } = await supabase
        .from('de_thi')
        .select('ten_de_thi')
        .eq('id', params.testId)
        .single()
      if (error || !data) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy tên đề thi')
      }
      setTestDesc(data.ten_de_thi)
    }
    fetchTestDesc()
  }, [testDesc])

  useEffect(() => {
    const fetchTestTotalScore = async () => {
      const { data, error } = await supabase
        .from('de_thi')
        .select('ma_cau_truc (so_cau_de_dat)')
        .eq('id', params.testId)
        .single()
      console.log(data)
      if (error || !data.ma_cau_truc) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy tổng số điểm')
      }
      // @ts-ignore
      setTestTotalScore(data.ma_cau_truc.so_cau_de_dat)
    }
    fetchTestTotalScore()
  }, [testTotalScore])

  useEffect(() => {
    const fetchUserTestResult = async () => {
      const { data, error } = await supabase
        .from('ket_qua_lam_bai')
        .select('diem, thoi_gian_lam_bai ')
        .eq('id', params.resultId)
        .single()
      if (error || !data) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy kết quả thi')
      }
      setUserScore(data.diem)
      setUserCompleteTime(formatTime(data.thoi_gian_lam_bai))
    }
    fetchUserTestResult()
  }, [testTotalScore])

  return (
    <ResultDetailPage
      questions={questions}
      testDesc={testDesc}
      userCompleteTime={userCompleteTime}
      userScore={userScore}
      testTotalScore={testTotalScore}
    />
  )
}

export default TestDetailPage
