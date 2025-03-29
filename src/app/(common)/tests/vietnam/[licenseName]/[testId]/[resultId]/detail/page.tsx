'use client'
import ResultDetailPage from '@/components/result-detail'
import useConfirmSubmitTestModal from '@/hooks/useConfirmSubmitTestModal'
import { QuestionDTO } from '@/types/dto/types'
import { LuaChon } from '@/types/types'
import supabase from '@/utils/supabase/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const shuffleAnswers = (answers: LuaChon[]) => {
  const shuffled = [...answers]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TestDetailPage = () => {
  const { item: questions, setQuestions } = useConfirmSubmitTestModal()
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
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('cau_hoi_de_thi')
        .select(
          `
            cau_hoi:ma_cau_hoi (*, lua_chon ( * ) )
          `
        )
        .eq('ma_de_thi', params.testId)

      if (error) {
        console.log(error)
        return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
      }

      const { data: userAnswersData, error: userAnswersError } = await supabase
        .from('ket_qua_bai_lam_lua_chon')
        .select(
          'ma_lua_chon, lua_chon!ket_qua_bai_lam_lua_chon_ma_lua_chon_fkey(ma_cau_hoi)'
        )
        .eq('ma_ket_qua_lam_bai', params.resultId)

      if (userAnswersError) {
        console.log(userAnswersError)
        return toast.error('Lỗi trong quá trình lấy dữ liệu câu hỏi')
      }
      const userAnswersMap = userAnswersData.reduce((acc: any, item: any) => {
        const maCauHoi = item.lua_chon?.ma_cau_hoi // Safely access ma_cau_hoi
        const maLuaChon = item.ma_lua_chon // Get ma_lua_chon

        if (maCauHoi && maLuaChon) {
          // Ensure both values exist
          acc[maCauHoi] = maLuaChon
        }

        return acc
      }, {})

      const formattedQuestions: QuestionDTO[] = data.map((item: any) => ({
        question: item.cau_hoi,
        answers: item.cau_hoi.lua_chon.some((a: LuaChon) => a.so_thu_tu === 0)
          ? shuffleAnswers(item.cau_hoi.lua_chon)
          : item.cau_hoi.lua_chon.sort(
              (a: LuaChon, b: LuaChon) => a.so_thu_tu - b.so_thu_tu
            ),
        userAnswerId: userAnswersMap[item.cau_hoi.id] || null,
      }))

      setQuestions(formattedQuestions)
    }
    if (questions.length === 0) {
      fetchQuestions()
    }
  }, [])

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
